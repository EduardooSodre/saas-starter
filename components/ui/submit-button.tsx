'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

export function SubmitButton({ children }: { children?: React.ReactNode }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50 flex items-center justify-center"
        >
            {pending && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
            {children ?? 'Assinar'}
        </button>
    );
}
