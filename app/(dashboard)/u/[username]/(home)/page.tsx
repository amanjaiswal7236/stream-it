import { StreamPlayer } from "@/components/stream-player";
import { getUserByUserame } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";

interface CreatorPageProps {
    params: {
        username: string;
    };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
    const externalUser = await currentUser();
    const user = await getUserByUserame(params.username);

    if(!user || user.externalUserId !== externalUser?.id || !user.stream) {
        throw new Error("Unauthorized access")
    }

    return (
        <div className="h-full">
            <StreamPlayer
                user={user}
                stream={user.stream}
                isFollowing
            />
        </div>
    )
}

export default CreatorPage;