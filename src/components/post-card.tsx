import Link from "next/link";
import type { Post } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsDown, ThumbsUp } from "lucide-react";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="group block">
      <Card className="flex h-full flex-col transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
          <CardDescription>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground italic">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge variant="secondary" className="capitalize">
            {post.type}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsDown className="h-4 w-4" />
              <span>{post.dislikes}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
