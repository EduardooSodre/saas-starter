import { getUserSubscription } from '@/lib/subscription';
import { notFound } from 'next/navigation';

export default async function PlusOnlyPage() {
    const subscription = await getUserSubscription();

    if (!subscription || subscription.plan !== 'Plus') {
        notFound(); // Se não for Plus, erro
    }

    return (
        <main className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Acesso Plus</h1>
            <p className="text-gray-700">Bem-vindo(a) ao conteúdo exclusivo do plano Plus. Aproveite as vantagens premium!</p>
        </main>
    );
}
