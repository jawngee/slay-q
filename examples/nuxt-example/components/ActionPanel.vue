<template>
	<div class="flex flex-col p-3 rounded-md border shadow-md">
		<h2 class="text-lg font-bold">{{ title }}</h2>
		<div><slot /></div>
		<div class="mt-3 flex items-center justify-center">
			<button type="button" class="border rounded-md px-2 py-1 hover:bg-neutral-100" @click="triggerAction">{{ actionTitle }}</button>
		</div>
	</div>
</template>
<script setup lang="ts">
const props = defineProps<{
	title: string;
	action: string;
	actionTitle: string;
}>();

async function triggerAction() {
	await $fetch(`/api/test/events/${props.action}`);
}
</script>