import { db } from "@/lib/firebase";
import type { Post } from "@/types";
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

const postsCollection = collection(db, "posts");

function postFromDoc(doc: any): Post {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    content: data.content,
    excerpt: data.excerpt,
    type: data.type,
    createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
    likes: data.likes,
    dislikes: data.dislikes,
  };
}

export async function getPosts(): Promise<Post[]> {
  const q = query(postsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(postFromDoc);
}

export async function getPost(id: string): Promise<Post | null> {
  const postDoc = await getDoc(doc(postsCollection, id));
  if (!postDoc.exists()) {
    return null;
  }
  return postFromDoc(postDoc);
}

export async function createPost(
  post: Omit<Post, "id" | "createdAt" | "likes" | "dislikes">
): Promise<string> {
  const newPost = {
    ...post,
    createdAt: serverTimestamp(),
    likes: 0,
    dislikes: 0,
  };
  const docRef = await addDoc(postsCollection, newPost);
  return docRef.id;
}

export async function updatePost(
  id: string,
  post: Partial<Post>
): Promise<void> {
  await updateDoc(doc(postsCollection, id), post);
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(postsCollection, id));
}

export async function updateVotes(
  id: string,
  likes: number,
  dislikes: number
): Promise<void> {
  await updateDoc(doc(postsCollection, id), { likes, dislikes });
}
