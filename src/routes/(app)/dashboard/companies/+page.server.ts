import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		companies: {
			company_0: {
				name: 'company 0',
				stage: 'applied'
			},
			company_1: {
				name: 'company 1',
				stage: 'applied'
			},
			company_2: {
				name: 'company 2',
				stage: 'applied'
			}
		}
	};
};
