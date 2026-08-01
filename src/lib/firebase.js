// Firebase Firestore only - this public site reads live data (platform
// locks, announcement, app controls) but never signs anyone in. The admin
// panel (a separate project, same Firebase project) is what writes here.
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAEUp2BUwAUj3uoc1oLJT3xiXjfRq90wAs',
  authDomain: 'next-study-admin-pannel.firebaseapp.com',
  projectId: 'next-study-admin-pannel',
  storageBucket: 'next-study-admin-pannel.firebasestorage.app',
  messagingSenderId: '314417720512',
  appId: '1:314417720512:web:6d5ddde2cdeb722a41d125',
  measurementId: 'G-ELS3MZ80L5',
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
