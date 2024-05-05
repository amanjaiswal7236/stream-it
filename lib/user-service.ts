import {db} from "@/lib/db";

export const getUserByUserame = async (username:string)=>{
    const user = await db.user.findUnique({
        where:{
            username
        }
    });

    return user;
}