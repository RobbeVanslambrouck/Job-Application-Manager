import type { Interview } from './Interview';
import type { Link } from './Link';
import { db } from '$lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

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
		await addDoc(collection(db, 'applications'), {
			uid: uid,
			application: application
		});
	} catch (error) {
		console.error(error);
	}
}

export async function getApplicationsFromFirestore(uid: string): Promise<Application[]> {
	const applications: Application[] = [];
	try {
		const q = query(collection(db, 'applications'), where('uid', '==', uid));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			const appData = doc.data().application;
			const application = createApplication(appData.companyName, appData.jobTitle);
			applications.push(application);
		});
		return applications;
	} catch (error) {
		console.error(error);
		return [];
	}
}

const applicationConverter = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fromFirestore: (data: any): Application => {
		const application = createApplication(data.companyName, data.jobTitle);
		application.appliedDate = data.appliedDate;

		return application;
	}
};
