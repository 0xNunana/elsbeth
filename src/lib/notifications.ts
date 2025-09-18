import { db } from "@/lib/firebase";
import type { Notification } from "@/types";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const notificationsCollection = collection(db, "notifications");

export async function createNotification(
  notification: Omit<Notification, "createdAt">
): Promise<string> {
  const newNotification = {
    ...notification,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(notificationsCollection, newNotification);
  return docRef.id;
}
