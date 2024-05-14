import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserame } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {
    const user = await getUserByUserame(params.username);

    if(!user){
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    

    return (
        <div>
            <p>username: {user.username}</p>
            <p>user id: {user.id}</p>
            <p>isFollowing: {`${isFollowing}`}</p>
            <p>isBlocked by this user: {`${isBlocked}`}</p>
            <Actions userId={user.id} isFollowing={isFollowing} isBlocked={isBlocked}/>
        </div>
    );
}

export default UserPage;