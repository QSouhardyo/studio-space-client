
'use client'

import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const DeleteStudioDialog = ({ listing }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${listing._id}`,
                {
                    method: 'DELETE'
                }
            );

            const data = await res.json();

            if (res.ok) {
                toast.success('Studio deleted successfully!');
                router.push('/dashboard/my-listings');
                router.refresh();
            } else {
                toast.error(data.message || 'Failed to delete studio!');
            }

        } catch (error) {
            toast.error('Something went wrong!');
            console.error(error);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={
                    <Button variant="destructive">
                        <Trash2 size={16} />
                    </Button>
                }
            >
                Delete
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this studio from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteStudioDialog;
