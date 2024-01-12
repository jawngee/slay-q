<template>
	<div class="flex items-center justify-center min-w-[100svh] p-10">
		<div class="flex flex-col gap-6 w-[480px] max-w-[90svw]">
			<div class="flex flex-col gap-2">
				<p>These events below demonstrate the different types of steps you can use when building a SlayQ function</p>
				<p>This UI is only useful for triggering the events.  Watch the console logs to see what the events are actually doing.</p>
			</div>
			<ActionPanel title="Sleep Example" action="sleep" action-title="Send Sleep Event">
				This simple action sleeps in the middle of the execution of the function.
			</ActionPanel>
			<ActionPanel title="Wait Example" action="wait" action-title="Send Wait Event">
				This action will pause processing in the middle of the function, waiting for another event to trigger.  Click on <strong>End Wait</strong> below to trigger it.
			</ActionPanel>
			<ActionPanel title="End Wait Example" action="endWait" action-title="Send End Wait Event">
				This event will cause any function waiting for it to run to continue running.
			</ActionPanel>
			<ActionPanel title="Invoke Example" action="invoke" action-title="Send Invoke Event">
				This event will trigger another event and wait for the result of that event to be returned to it.
			</ActionPanel>
			<ActionPanel title="Cancel Example" action="cancel" action-title="Send Cancel Event">
				This will trigger an event that will pause execution for 3 minutes.  Sending the event again before the 3 minutes expire will cancel the previous event and the new event will then pause 3 minutes.
			</ActionPanel>
		</div>
	</div>
</template>
<script setup lang="ts">
async function sleep() {
	await $fetch('/api/test/events/sleep');
}

async function wait() {
	await $fetch('/api/test/events/wait');
}

async function endWait() {
	await $fetch('/api/test/events/endWait');
}

async function invoke() {
	await $fetch('/api/test/events/invoke');
}

async function cancel() {
	await $fetch('/api/test/events/cancel');
}
</script>
