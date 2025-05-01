import { PUBLIC_SERVER } from '$env/static/public';
import { Z } from 'zero-svelte';
import { schema, type Schema } from './schema.js';

export function get_z_options() {
	return {
		userID: 'anon',
		server: PUBLIC_SERVER,
		schema
	} as const;
}

export const z = new Z<Schema>(get_z_options());
