export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  type: "poem" | "story" | "blog";
  createdAt: string;
  likes: number;
  dislikes: number;
};

export type User = {
  uid: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
};
