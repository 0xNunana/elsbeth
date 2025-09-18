import { PostCard } from "@/components/post-card";
import { getPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="container py-8 md:py-12">
      <section className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Elsbeth&apos;s Quill
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A tranquil corner of the internet for poems, stories, and reflections
          by Dagna Corona Holdbrook.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
