import { getUser, getTeamForUser } from '@/lib/db/queries';
import { notFound } from 'next/navigation';

export default async function FreeOnlyPage() {
    const user = await getUser();
    if (!user) return notFound();

    const team = await getTeamForUser(user.id);

    // Se existir plano (Base ou Plus), nega o acesso à tela Free
    if (team?.planName === 'Base' || team?.planName === 'Plus') {
        return notFound();
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Área Exclusiva Free</h1>
            <p className="text-gray-700 mt-2">Você está usando o plano gratuito. Aproveite!</p>
        </div>
    );
}
