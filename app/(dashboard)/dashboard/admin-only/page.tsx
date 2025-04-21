import { getUser } from '@/lib/db/queries';
import { notFound } from 'next/navigation';

export default async function AdminOnlyPage() {
    const user = await getUser();

    if (!user || user.role !== 'owner') {
        notFound();
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Admin Only Page</h1>
            <p>Bem vindo! Adminstrador</p>
        </main>
    );
}