export default defineEventHandler(async (event) => {
	let body = await readBody(event);
	const runtimeConfig = useRuntimeConfig();

	return $fetch(
		`${runtimeConfig.apiUrl}employees`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer "access_token"`,
				"Content-Type": "application/json",
			},
			body,
		},
	);
});
