# Slay Q Server - Docker Edition
The `docker-compose.yml` in this directory is a quick way to get Slay Q up and running for local development.

```bash
npx giget@latest gh:SlayPics/SlayUtils/docker slayq-docker
cd slayq-docker
docker compose up -d
```

## ingest.env
This environment file contains all of the environment variables you need to get the http ingest server running:

* `NITRO_SLAY_Q_SECRET` - This is the shared secret to verify and sign requests.
* `NITRO_DATABASE_URL` - This is the database connection url for your postgres database.

## worker.env
This environment file contains all of the variables you need for the Graphile Worker server.

* `SLAY_Q_DATABASE_URL` - This is the database connection url for your postgres database.
* `SLAY_Q_SECRET` - This is the shared secret to verify and sign requests.
* `SLAY_Q_CRON_URL` - This is the URL to your slay-q endpoint.  The worker sends a cron event every minute to your app so that
  the app can dispatch any events to run any waiting cronjobs.

