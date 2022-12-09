import type { Link } from './Link';
import { db } from '$lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { createEvent, type IEvent } from './Event';

export interface Application {
	companyName: string;
	jobTitle: string;
	links: Link[];
	events: IEvent[];
}

export function createApplication(companyName = '', jobTitle = ''): Application {
	return {
		companyName: companyName,
		jobTitle: jobTitle,
		links: [],
		events: []
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
			const storeApplication = doc.data().application;
			const application = createApplication(
				storeApplication.companyName,
				storeApplication.jobTitle
			);
			application.links = storeApplication.links;
			application.events = parseStoreEvents(storeApplication.events);
			applications.push(application);
		});
		return applications;
	} catch (error) {
		console.error(error);
		return [];
	}
}

function parseStoreEvents(storeEvents: { [key: string]: any }[]): IEvent[] {
	const events: IEvent[] = [];
	for (const store of storeEvents) {
		const event = createEvent(store.title);
		event.creationDate = new Date(store.creationDate.seconds * 1000);
		event.description = store.description;
		if (store.startDate) {
			event.startDate = new Date(store.startDate.seconds * 1000);
		}
		if (store.endDate) {
			event.endDate = new Date(store.endDate.seconds * 1000);
		}
		event.location = store.location;
		events.push(event);
	}

	return events;
}
