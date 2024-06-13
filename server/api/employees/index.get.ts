export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig();
	return $fetch(`${runtimeConfig.apiUrl}employees`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${event.context.auth.access_token}`,
			"Content-Type": "application/json",
		},
	});
});
