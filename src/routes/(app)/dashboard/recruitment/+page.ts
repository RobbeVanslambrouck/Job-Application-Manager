import { browser } from '$app/environment';
import { auth } from '$lib/firebase';
import { getAgenciesFromFirestore, type RecruitmentAgency } from '$lib/recruitmentAgency';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	let agencies: RecruitmentAgency[] = [];
	if (!browser || !auth.currentUser) return { agencies: agencies };
	try {
		agencies = await getAgenciesFromFirestore(auth.currentUser?.uid as string);
	} catch (error) {
		console.error(error);
	}

	return {
		agencies: agencies
	};
};
