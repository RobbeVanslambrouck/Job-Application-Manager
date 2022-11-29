import type { Interview } from './Interview';
import type { Link } from './Link';

export interface Application {
	companyName: string;
	jobTitle: string;
	appliedDate: Date | null;
	links: Link[];
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
