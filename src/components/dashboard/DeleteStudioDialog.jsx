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
} from "@/components/ui/alert-dialog"
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { redirect } from 'next/navigation';

const DeleteStudioDialog = ({ listing }) => {
    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/my-listings/${listing._id}`, {
            method: 'DELETE'
        })
        const data = await res.json()
        console.log(data);

        redirect('/dashboard/my-listings')
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant='destructive'> <Trash2 size={16} /></Button>}>
                Show Dialog
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteStudioDialog;