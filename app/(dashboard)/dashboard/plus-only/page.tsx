import { getUser, getTeamForUser } from '@/lib/db/queries';
import { notFound } from 'next/navigation';

export default async function PlusOnlyPage() {
    const user = await getUser();
    if (!user) return notFound();

    const team = await getTeamForUser(user.id);
    if (!team || team.planName !== 'Plus') {
        throw new Error('Acesso restrito ao plano Plus');
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-orange-600">Área Exclusiva do Plano Plus</h1>
            <p className="mt-4 text-gray-700">
                Você tem acesso a funcionalidades avançadas e suporte premium.
            </p>
        </div>
    );
}
