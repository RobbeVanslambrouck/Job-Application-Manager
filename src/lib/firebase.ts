import { PUBLIC_FIREBASE_CLIENT_CONFIG } from '$env/static/public';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = JSON.parse(PUBLIC_FIREBASE_CLIENT_CONFIG);

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

function loginWithGoogle() {
	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider);
}

function logout() {
	signOut(auth);
}

export { db, auth, loginWithGoogle, logout };
