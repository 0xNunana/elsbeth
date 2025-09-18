"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Post } from "@/types";

import { createPost, updatePost } from "@/lib/posts";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long." }),
  type: z.enum(["poem", "story", "blog"]),
  excerpt: z
    .string()
    .min(10, { message: "Excerpt must be at least 10 characters long." })
    .max(150, { message: "Excerpt must be at most 150 characters long." }),
});

type PostFormProps = {
  post?: Post;
};

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      type: post?.type || "poem",
      excerpt: post?.excerpt || "",
    },
  });

  const contentValue = form.watch("content");
  const typeValue = form.watch("type");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (post) {
        await updatePost(post.id, values);
        toast.success("Post updated!");
      } else {
        await createPost(values);
        toast.success("Post created!");
      }
      router.push("/admin");
      router.refresh(); // To invalidate client cache and refetch from server
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSelectTitle = (title: string) => {
    form.setValue("title", title, { shouldValidate: true });
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {post ? "Edit Post" : "Create New Post"}
        </CardTitle>
        <CardDescription>
          {post
            ? "Make changes to your existing post."
            : "Draft a new poem, story, or blog entry."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Whispers of the Dawn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short summary of the post..."
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    A short, catchy summary for the post card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="The sun, a painter with a gentle hand..."
                      {...field}
                      rows={15}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a post type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="poem">Poem</SelectItem>
                      <SelectItem value="story">Story</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {post ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
