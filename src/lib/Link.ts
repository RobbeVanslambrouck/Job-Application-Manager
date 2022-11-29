export interface Link {
	name: string;
	url: string;
}

export function createLink(url: string, name?: string): Link {
	name = name ? name : url;
	return {
		name,
		url
	};
}
