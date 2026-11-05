import Sidebar from '@/components/ui/shared/Sidebar';
import React from 'react';
import { Toaster } from 'sonner';

const layout = ({ children }) => {
    return (
        <div className='flex flex-col-reverse gap-6 lg:flex-row'>
            <Sidebar></Sidebar>
            <div className='flex-1'>
                {children}
                <Toaster position="top-right" richColors />
            </div>
        </div>
    );
};

export default layout;