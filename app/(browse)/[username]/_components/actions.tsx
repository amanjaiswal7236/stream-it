"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;

}

export const Actions = ({
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
            .then((data)=> toast.success(`Followed user ${data!.following.username}`)) // Add type assertion 'data!'
            .catch(()=> toast.error("Failed to follow user"));
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
            .then((data)=> toast.success(`Unfollowed user ${data!.following.username}`)) // Add type assertion 'data!'
            .catch(()=> toast.error("Failed to follow user"));
        })
    }

    const onClick = isFollowing ? handleUnfollow : handleFollow;
    return (
        <div>
            <Button disabled={isPending} onClick={onClick} variant="primary">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
        </div>
    );
}