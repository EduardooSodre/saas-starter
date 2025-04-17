import { getUser } from '@/lib/auth/auth';
import { notFound } from 'next/navigation';

export default async function AdminOnlyPage() {
    const user = await getUser();

    if (!user || user.role !== 'owner') {
        notFound(); // Redireciona para 404 se não for admin
    }

    return (
        <main className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Área do Admin</h1>
            <p className="text-gray-700">Você tem acesso como administrador. Aqui vão os recursos restritos apenas ao time administrativo.</p>
        </main>
    );
}
