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

interface Interview {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
}

export function createInterview(title = ''): Interview {
	return {
		title: title,
		description: '',
		startDate: new Date(),
		endDate: new Date()
	};
}
