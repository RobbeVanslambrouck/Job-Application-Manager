import { createApplication, createInterview } from '$lib/application';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// TODO replace code with link to database

	const applications = [
		createApplication('tesla', 'web developer'),
		createApplication('google', 'web developer'),
		createApplication('twitter', 'web developer')
	];

	applications[0].interviews.push(createInterview());
	return {
		applications
	};
};
