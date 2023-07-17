import { type RequestHandler, json } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	return json({ message: 'Hello World' });
}) satisfies RequestHandler;
