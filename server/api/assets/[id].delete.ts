export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig();
	
	return $fetch(
		`${runtimeConfig.apiUrl}assets/${event.context.params.id}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer "access_token"`,
				"Content-Type": "application/json",
			},
		},
	);
});
