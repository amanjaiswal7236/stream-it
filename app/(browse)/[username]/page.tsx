import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserame } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUserame(params.username);

    if(!user || !user.stream){
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if(isBlocked){
        notFound();
    }

    return (
        <div>
            <StreamPlayer
                user={user}
                stream={user.stream}
                isFollowing={isFollowing}
                
            />
        </div>
    );
}

export default UserPage;