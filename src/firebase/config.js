import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7pBujP_g9eWSLEXY15k7FhwLzTEjqGKM",
  authDomain: "chinese-poker-cc7bd.firebaseapp.com",
  projectId: "chinese-poker-cc7bd",
  storageBucket: "chinese-poker-cc7bd.firebasestorage.app",
  messagingSenderId: "443208340718",
  appId: "1:443208340718:web:ecb851a0d58e91dbc44fff"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

