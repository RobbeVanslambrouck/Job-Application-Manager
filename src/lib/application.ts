import type { Interview } from './Interview';
import type { Link } from './Link';
import { db } from '$lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

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

export async function applicationToFirestore(uid: string, application: Application) {
	try {
		const path = uid + '/applications';
		await addDoc(collection(db, path), application);
	} catch (err) {
		console.error(err);
	}
}
