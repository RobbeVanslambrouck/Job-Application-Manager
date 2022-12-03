import { getApplicationsFromFirestore, type Application } from '$lib/application';
import { auth } from '$lib/firebase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	let applications: Application[] = [];
	try {
		applications = await getApplicationsFromFirestore(auth.currentUser?.uid as string);
	} catch (error) {
		console.error(error);
	}

	return {
		applications: applications
	};
};
