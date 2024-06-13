export default defineEventHandler(async (event) => {
	let body = await readBody(event);
	const runtimeConfig = useRuntimeConfig();
	return $fetch(
		`${runtimeConfig.apiUrl}assets/${event.context.params.id}`,
		{
			method: "PUT",
			headers: {
				Authorization: `Bearer "access_token"`,
				"Content-Type": "application/json",
			},
			body,
		},
	);
});
