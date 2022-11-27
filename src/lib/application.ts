import type { Interview } from './Interview';

export interface Application {
	companyName: string;
	jobTitle: string;
	appliedDate: Date | null;
	links: string[];
	interviews: Interview[];
}

export function createApplication(companyName = '', jobTitle = ''): Application {
	return {
		companyName: companyName,
		jobTitle: jobTitle,
		appliedDate: null,
		links: [],
		interviews: []
	};
}
