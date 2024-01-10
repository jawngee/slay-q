------------------------------------------------------------------------------------------------------------------------
-- Table for tasks waiting for an event to run
------------------------------------------------------------------------------------------------------------------------
create table graphile_worker._private_waiting_on  (
	id bigserial primary key,
	job_id bigint not null references graphile_worker._private_jobs(id) on delete cascade,
	event text,
	match_key text,
	match_value text,
	step_name text,
	expires_at timestamptz not null
);

------------------------------------------------------------------------------------------------------------------------
-- Table for tasks that have invoked another and are waiting for results
------------------------------------------------------------------------------------------------------------------------
create table graphile_worker._private_invoker (
	id bigserial primary key,
	job_id bigint not null references graphile_worker._private_jobs(id) on delete cascade,
	job_key text not null,
	step_name text
);

------------------------------------------------------------------------------------------------------------------------
-- add_worker_job - exposes graphile_worker.add_job to public schema
------------------------------------------------------------------------------------------------------------------------
-- drop function if exists add_worker_job;
create function add_worker_job (
    identifier text,
    payload json DEFAULT NULL::json,
    queue_name text DEFAULT NULL::text,
    run_at timestamp with time zone DEFAULT NULL::timestamp with time zone,
    max_attempts integer DEFAULT NULL::integer,
    job_key text DEFAULT NULL::text,
    priority integer DEFAULT NULL::integer,
    flags text[] DEFAULT NULL::text[],
    job_key_mode text DEFAULT 'replace'::text
) returns void security definer language plpgsql as $$
begin
	perform graphile_worker.add_job(identifier, payload, queue_name, run_at, max_attempts, job_key, priority, flags, job_key_mode);
end
$$;

------------------------------------------------------------------------------------------------------------------------
-- wait_for_worker_event - Waits for the specified event to fire
------------------------------------------------------------------------------------------------------------------------
-- drop function if exists wait_for_worker_event;
create or replace function wait_for_worker_event(_job_key text, _event text, _match_key text, _match_value text, _step_name text, _expires_at timestamptz) returns void as $$
declare
	_job_id bigint;
begin
	select into _job_id id from graphile_worker._private_jobs where key = _job_key;
	if _job_id is null then
		raise exception 'Job not found: %', _job_key;
	end if;

	insert into graphile_worker._private_waiting_on (job_id, event, match_key, match_value, step_name, expires_at) values (_job_id, _event, _match_key, _match_value, _step_name, _expires_at);
end
$$ language plpgsql security definer;


------------------------------------------------------------------------------------------------------------------------
-- wait_for_invocation - Invokes specified event and pauses caller until done
------------------------------------------------------------------------------------------------------------------------
-- drop function if exists wait_for_invocation;
create or replace function wait_for_invocation(_invoker_job_key text, _target_job_key text, _step_name text) returns void as $$
declare
	_job_id bigint;
begin
	select into _job_id id from graphile_worker._private_jobs where key = _invoker_job_key;
	if _job_id is null then
		raise exception 'Job not found: %', _invoker_job_key;
	end if;

	insert into graphile_worker._private_invoker (job_id, job_key, step_name) values (_job_id, _target_job_key, _step_name);
end
$$ language plpgsql security definer;


------------------------------------------------------------------------------------------------------------------------
-- trigger_waiting_invoker - Called when invoked function is done
------------------------------------------------------------------------------------------------------------------------
-- drop function if exists trigger_waiting_invoker;
create or replace function trigger_waiting_invoker(_job_key text, _result json) returns void as $$
declare
	_job_id bigint;
	_waiting_id bigint;
	_step_name text;
begin
	loop
		select into
			_waiting_id, _job_id, _step_name id, job_id, step_name
		from
			graphile_worker._private_invoker
		where
			graphile_worker._private_invoker.job_key = _job_key
		order by
			id
		limit 1;

		if _waiting_id is null then
			exit;
		end if;

		update
			graphile_worker._private_jobs
		set
			run_at = now(),
			payload = jsonb_set(coalesce(payload::jsonb, '{}'::jsonb), concat('{cache,', _step_name, '}')::text[], _result::jsonb)::json
		where
			id = _job_id;

		delete from graphile_worker._private_invoker where id = _waiting_id;
	end loop;
end
$$ language plpgsql security definer;

------------------------------------------------------------------------------------------------------------------------
-- trigger_waiting_workers - Reschedules any waiting events for immeadiate execution
------------------------------------------------------------------------------------------------------------------------
-- drop function if exists trigger_waiting_workers;
create or replace function trigger_waiting_workers(_event text, _match_key text, _match_value text) returns void as $$
declare
	_job_id bigint;
	_waiting_id bigint;
	_step_name text;
begin
	loop
		select into
			_waiting_id, _job_id, _step_name id, job_id, step_name
		from
			graphile_worker._private_waiting_on
		where
			graphile_worker._private_waiting_on.event = _event
		and
			match_key = _match_key
		and
			match_value = _match_value
		and
			expires_at >= now()
		order by
			id
		limit 1;

		if _waiting_id is null then
			exit;
		end if;

		update
			graphile_worker._private_jobs
		set
			run_at = now(),
			payload = jsonb_set(coalesce(payload::jsonb, '{}'::jsonb), concat('{cache,', _step_name, '}')::text[], 'true')::json
		where
			id = _job_id;

		delete from graphile_worker._private_waiting_on where id = _waiting_id;
	end loop;
end
$$ language plpgsql security definer;

------------------------------------------------------------------------------------------------------------------------
-- cancel_pending_tasks - Cancels any pending tasks
------------------------------------------------------------------------------------------------------------------------
create or replace function cancel_pending_tasks(event text, matchKey text, matchVal text) returns void language plpgsql security definer as $$
begin
	delete from
		graphile_worker._private_jobs
 	where
 	  payload->>'event' = event
	and
 	  json_extract_path_text(payload, 'data', matchKey) = matchVal
	and
 	  locked_at is null;
end
$$;
