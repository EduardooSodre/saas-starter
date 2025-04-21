import { getUser, getTeamForUser } from '@/lib/db/queries';
import { notFound } from 'next/navigation';

export default async function BaseOnlyPage() {
    const user = await getUser();
    if (!user) return notFound();

    const team = await getTeamForUser(user.id);
    if (!team || team.planName !== 'Base') {
        return notFound();
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Área Exclusiva Base</h1>
            <p className="text-gray-700 mt-2">Bem-vindo ao conteúdo exclusivo para assinantes do plano Base.</p>
        </div>
    );
}
