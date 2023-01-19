import { db } from '$lib/firebase';
import { collection, getDocs, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

export type RecruitmentAgency = {
	name: string;
	contacts: Contact[];
	proposedCompanies: Company[];
};

export type Contact = {
	name: string;
	email: string;
	phone: string;
};

export function createContact(name = ''): Contact {
	return {
		name: name,
		email: '',
		phone: ''
	};
}

export type Company = {
	name: string;
};

export function createCompany(name = ''): Company {
	return {
		name: name
	};
}

export function createRecruitmentAgency(): RecruitmentAgency {
	return {
		name: '',
		contacts: [],
		proposedCompanies: []
	};
}

export async function agencyToFirestore(uid: string, agency: RecruitmentAgency) {
	try {
		const ref = doc(db, 'users', uid, 'agencies', agency.name);
		await setDoc(ref, agency);
	} catch (error) {
		console.error(error);
	}
}

export async function getAgenciesFromFirestore(uid: string) {
	const agencies: RecruitmentAgency[] = [];
	try {
		const querySnapshot = await getDocs(collection(db, 'users', uid, 'agencies'));
		querySnapshot.forEach((doc) => {
			agencies.push(doc.data() as RecruitmentAgency);
		});
		return agencies;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getAgencyFromFirestore(uid: string, name: string) {
	try {
		const ref = doc(db, 'users', uid, 'agencies', name);
		const snapshot = await getDoc(ref);
		if (snapshot.exists()) {
			return snapshot.data() as RecruitmentAgency;
		}
		return undefined;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

export async function deleteAgencyFromFirestore(uid: string, name: string) {
	try {
		const ref = doc(db, 'users', uid, 'agencies', name);
		await deleteDoc(ref);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
