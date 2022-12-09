import { browser } from '$app/environment';
import { getApplicationsFromFirestore, type Application } from '$lib/Application';
import { auth } from '$lib/firebase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	let applications: Application[] = [];
	if (!browser || !auth.currentUser) return { applications: applications };
	try {
		applications = await getApplicationsFromFirestore(auth.currentUser?.uid as string);
	} catch (error) {
		console.error(error);
	}

	return {
		applications: applications
	};
};
