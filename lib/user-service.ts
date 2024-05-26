import {db} from "@/lib/db";

export const getUserByUserame = async (username:string)=>{
    const user = await db.user.findUnique({
        where:{
            username
        },
        select: {
            id: true,
            externalUserId: true,
            username: true,
            bio: true,
            imageUrl: true,
            stream: {
                select: {
                    id: true,
                    isLive: true,
                    isChatDelayed: true,
                    isChatEnabled : true,
                    isChatFollowersOnly: true,
                    thumbnailUrl: true,
                    name: true,
                },
            },
            _count: {
                select: {
                    followers: true,
                }
            }
        }
    });

    return user;
}

export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id
        },
        include: {
            stream: true
        },
    });

    return user;
}