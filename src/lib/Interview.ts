export interface Interview {
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
