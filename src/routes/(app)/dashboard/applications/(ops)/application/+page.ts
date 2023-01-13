import { browser } from '$app/environment';
import { createApplication, getApplicationFromFirestore, type Application } from '$lib/Application';
import { auth } from '$lib/firebase';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('id');
	let application: Application = createApplication();
	if (!browser || !auth.currentUser || !id) return { application: application };
	try {
		application =
			(await getApplicationFromFirestore(auth.currentUser?.uid as string, id)) ?? application;
	} catch (error) {
		console.error(error);
	}

	return {
		application: application
	};
};
