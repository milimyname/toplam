import { TriplitClient } from '@triplit/client';
import { browser } from '$app/environment';
//@ts-expect-error check it
import { VITE_TRIPLIT_TOKEN, VITE_TRIPLIT_SERVER_URL } from '$env/static/public';

if (!VITE_TRIPLIT_TOKEN || !VITE_TRIPLIT_SERVER_URL)
	throw new Error('Missing Triplit environment variables');

export const client = new TriplitClient({
	serverUrl: VITE_TRIPLIT_SERVER_URL,
	token: VITE_TRIPLIT_TOKEN,
	autoConnect: browser
});
