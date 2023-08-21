import { browser } from '$app/environment';
import {
	createRecruitmentAgency,
	getAgencyFromFirestore,
	type RecruitmentAgency
} from '$lib/recruitmentAgency';
import { auth } from '$lib/firebase';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const name = url.searchParams.get('name');
	let agency: RecruitmentAgency = createRecruitmentAgency();
	if (!browser || !auth.currentUser || !name) return { agency: agency };
	try {
		agency = (await getAgencyFromFirestore(auth.currentUser?.uid as string, name)) ?? agency;
	} catch (error) {
		console.error(error);
	}

	return {
		agency: agency
	};
};
