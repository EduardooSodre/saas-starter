import { getUser, getTeamForUser } from '@/lib/db/queries';
import { notFound } from 'next/navigation';

export default async function PlusOnlyPage() {
    const user = await getUser();
    if (!user) return notFound();

    const team = await getTeamForUser(user.id);
    if (!team || team.planName !== 'Plus') return notFound();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Página exclusiva do Plano Plus</h1>
            <p className="mt-2 text-gray-600">
                Bem-vindo! Esta página é acessível apenas para usuários do plano Plus.
            </p>
        </div>
    );
}
