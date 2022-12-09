import type { Link } from './Link';
import { db } from '$lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { ApplicationEvent } from './Event';

export interface Application {
	companyName: string;
	jobTitle: string;
	links: Link[];
	events: ApplicationEvent[];
}

export function createApplication(companyName = '', jobTitle = ''): Application {
	const event = new ApplicationEvent('applied');
	return {
		companyName: companyName,
		jobTitle: jobTitle,
		links: [],
		events: [new ApplicationEvent('added application'), event]
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
