"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { updateVotes } from "@/lib/posts";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

type VotingProps = {
  postId: string;
  initialLikes: number;
  initialDislikes: number;
};

export function Voting({ postId, initialLikes, initialDislikes }: VotingProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [voted, setVoted] = useState<"like" | "dislike" | null>(null);

  const { user } = useAuth();

  const handleVote = async (type: "like" | "dislike") => {
    if (!user) {
      toast.error("Please log in to vote.");
      return;
    }

    let newLikes = likes;
    let newDislikes = dislikes;

    if (voted === type) {
      // Un-vote
      if (type === "like") newLikes--;
      if (type === "dislike") newDislikes--;
      setVoted(null);
    } else {
      // Change vote
      if (voted === "like") newLikes--;
      if (voted === "dislike") newDislikes--;

      // Cast new vote
      if (type === "like") newLikes++;
      if (type === "dislike") newDislikes++;

      setVoted(type);
    }

    setLikes(newLikes);
    setDislikes(newDislikes);

    try {
      await updateVotes(postId, newLikes, newDislikes);
      toast.success("Thank you for your feedback!");
    } catch (e) {
      console.error("Failed to update votes", e);
      // revert state
      setLikes(likes);
      setDislikes(dislikes);
      setVoted(voted);
      toast.error("Could not save vote. Please try again.");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm font-medium text-muted-foreground">
        Did you enjoy this piece?
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleVote("like")}
          className={cn(
            voted === "like" ? "bg-accent text-accent-foreground" : ""
          )}
          aria-pressed={voted === "like"}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          {likes}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleVote("dislike")}
          className={cn(
            voted === "dislike" ? "bg-accent text-accent-foreground" : ""
          )}
          aria-pressed={voted === "dislike"}
        >
          <ThumbsDown className="h-4 w-4 mr-2" />
          {dislikes}
        </Button>
      </div>
    </div>
  );
}
