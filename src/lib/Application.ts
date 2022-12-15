import type { Link } from './Link';
import { db } from '$lib/firebase';
import {
	collection,
	getDocs,
	query,
	QueryDocumentSnapshot,
	doc,
	setDoc,
	getDoc,
	DocumentReference,
	deleteDoc
} from 'firebase/firestore';
import { createEvent, type Event } from './Event';

export interface Application {
	id: string;
	companyName: string;
	jobTitle: string;
	links: Link[];
	events: Event[];
}

interface ApplicationStore {
	companyName: string;
	jobTitle: string;
	links: Link[];
	events: Event[];
}

export function createApplication(companyName = '', jobTitle = '', id?: string): Application {
	return {
		id: id ?? Date.now().toString(),
		companyName: companyName,
		jobTitle: jobTitle,
		links: [],
		events: []
	};
}

const ApplicationConverter = {
	toFirestore: (application: Application) => {
		const { id: _, ...data } = application;
		return data;
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot) => {
		const data = snapshot.data() as ApplicationStore;
		const id = snapshot.id;
		const application = createApplication(data.companyName, data.jobTitle, id);
		application.links = data.links;
		application.events = parseStoreEvents(data.events);
		return application;
	}
};

export async function applicationToFirestore(uid: string, application: Application) {
	try {
		const ref = doc(db, 'users', uid, 'applications', application.id).withConverter(
			ApplicationConverter
		);
		await setDoc(ref, application);
	} catch (error) {
		console.error(error);
	}
}

export async function getApplicationsFromFirestore(uid: string): Promise<Application[]> {
	const applications: Application[] = [];
	try {
		const q = query(collection(db, 'users', uid, 'applications'));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			const application = ApplicationConverter.fromFirestore(doc);
			applications.push(application);
		});
		return applications;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getApplicationFromFirestore(
	uid: string,
	id: string
): Promise<Application | undefined> {
	try {
		const ref = doc(db, 'users', uid, 'applications', id).withConverter(ApplicationConverter);
		const snapshot = await getDoc(ref);
		if (snapshot.exists()) {
			return snapshot.data();
		}
		return undefined;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

export async function deleteApplicationFromFirestore(uid: string, id: string) {
	try {
		const ref = doc(db, 'users', uid, 'applications', id);
		await deleteDoc(ref);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

function parseStoreEvents(storeEvents?: { [key: string]: any }[]): Event[] {
	const events: Event[] = [];
	if (!storeEvents) return events;

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
