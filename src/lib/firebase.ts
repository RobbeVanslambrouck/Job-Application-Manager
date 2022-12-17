import { PUBLIC_FIREBASE_CLIENT_CONFIG } from '$env/static/public';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
	getAuth,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithRedirect,
	signOut
} from 'firebase/auth';

const firebaseConfig = JSON.parse(PUBLIC_FIREBASE_CLIENT_CONFIG);

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export function loginWithGoogle() {
	const provider = new GoogleAuthProvider();
	signInWithRedirect(auth, provider);
}

export function loginWithGithub() {
	const provider = new GithubAuthProvider();
	signInWithRedirect(auth, provider);
}

export function logout() {
	signOut(auth);
}
