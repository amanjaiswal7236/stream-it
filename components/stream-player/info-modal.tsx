"use client"

import { useState, useTransition, useRef, ElementRef } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl
}: InfoModalProps) => {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
    const [isPending, startTransition] = useTransition();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success("Stream info updated");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Failed to update stream info"))
        })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit your stream info
                    </DialogTitle>
                </DialogHeader>
                <form action="" onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Stream name
                        </Label>
                        <Input
                            placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Thumbnail
                        </Label>
                        <div className="rounded-xl border outline-dashed outline-muted">
                            <UploadDropzone
                                endpoint="thumbnailUploader"
                                appearance={{
                                    label: {
                                        color: "#FFFFFF"
                                    },
                                    allowedContent: {
                                        color: "#FFFFFF"
                                    }
                                }}
                                onClientUploadComplete={(res)=>{
                                    setThumbnailUrl(res?.[0]?.url);
                                    router.refresh();
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            variant="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}