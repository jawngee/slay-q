<template>
	<div class="flex items-center justify-center gap-3 flex-wrap">
		<button type="button" @click="sleep">Sleep</button>
		<button type="button" @click="wait">Wait</button>
		<button type="button" @click="endWait">End Wait</button>
		<button type="button" @click="invoke">Invoke</button>
		<button type="button" @click="cancel">Cancel</button>
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
<style>
button {
	@apply border rounded-md px-2 py-1;
}
</style>