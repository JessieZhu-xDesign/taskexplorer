// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { Task } from './types';

// Replace with your Firebase config object from the Firebase Console
const firebaseConfig = {
  apiKey: "<replace-me>",
  authDomain: "<replace-me>",
  projectId: "<replace-me>",
  storageBucket: "<replace-me>",
  messagingSenderId: "<replace-me>",
  appId: "<replace-me>"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tasksCollection = collection(db, 'tasks');

export const getTasks = async (): Promise<Task[]> => {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map(doc => ({ ...(doc.data() as Task), id: doc.id }));
};

export const addTask = async (
  task: Omit<Task, 'id'>
): Promise<string> => {
  const docRef = await addDoc(tasksCollection, task);
  return docRef.id;
};

export const updateTask = async (
  id: string,
  updates: Partial<Task>
): Promise<void> => {
  const taskDoc = doc(db, 'tasks', id);
  await updateDoc(taskDoc, updates);
};

export const deleteTask = async (id: string): Promise<void> => {
  const taskDoc = doc(db, 'tasks', id);
  await deleteDoc(taskDoc);
};

export { db };
