import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { getPost } from "@/lib/posts";

type EditPostPageProps = {
  params: {
    id: string;
  };
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return <PostForm post={post} />;
}
