export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig();
	return $fetch(`${runtimeConfig.apiUrl}assets`, {
		method: "GET",
		headers: {
			Authorization: `Bearer "access_token"`,
			"Content-Type": "application/json",
		},
	});
});
