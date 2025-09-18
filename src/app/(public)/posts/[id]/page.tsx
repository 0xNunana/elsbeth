import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Voting } from "@/components/voting";
import { Separator } from "@/components/ui/separator";
import { EmailSignupForm } from "@/components/email-signup-form";
import { getPost, getPosts } from "@/lib/posts";

type PostPageProps = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-3xl mx-auto py-8 md:py-16">
      <header className="text-center mb-8">
        <Badge variant="secondary" className="mb-4 capitalize">
          {post.type}
        </Badge>
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-2">
          {post.title}
        </h1>
        <p className="text-muted-foreground text-sm">
          Published on{" "}
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto whitespace-pre-wrap font-body leading-relaxed text-foreground">
        {post.content}
      </div>

      <Separator className="my-12" />

      <footer className="flex flex-col items-center gap-8">
        <Voting
          postId={post.id}
          initialLikes={post.likes}
          initialDislikes={post.dislikes}
        />
      </footer>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}
