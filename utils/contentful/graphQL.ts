export default async function fetchGraphQL(query: string): Promise<any> {
	return fetch(
		`https://graphql.contentful.com/content/v1/spaces/xuxezsjlpoxn`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer 8vNXQc9hTA-WYC3hCTps2hR4xKW817WNZShlcuqY-lo`,
			},
			body: JSON.stringify({ query }),
		}
	).then((response) => response.json());
}
