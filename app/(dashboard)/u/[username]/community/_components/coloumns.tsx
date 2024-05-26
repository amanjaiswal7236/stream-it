"use client"

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { UnblockButton } from "./unblock-button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlockedUser = {
  id: string;
  userId: string;
  imageUrl: string;
  username: string;
  createdAt: string;
}

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: "username",
    header: ({column})=> (
        <Button
            variant="ghost"
            onClick={()=>column.toggleSorting(column.getIsSorted()==='asc')}
        >
            Username
            <ArrowUpDown className="ml-2 h-4"/>
        </Button>
    ),
    cell: ({row}) => (
        <div>
            <UserAvatar
                imageUrl={row.original.imageUrl}
                username={row.original.username}
            />
            <span>{row.original.username}</span>
        </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: ({column})=> (
        <Button
            variant="ghost"
            onClick={()=>column.toggleSorting(column.getIsSorted()==='asc')}
        >
            Date Blocked
            <ArrowUpDown className="ml-2 h-4"/>
        </Button>
    ),
  },
  {
    id: "actions",
    cell: ({row})=> <UnblockButton userId={row.original.userId}/>
  },
]
