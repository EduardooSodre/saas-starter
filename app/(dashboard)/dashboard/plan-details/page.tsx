import { getUser, getTeamForUser } from '@/lib/db/queries';
import { notFound } from 'next/navigation';

export default async function PlanDetailPage() {
    const user = await getUser();
    if (!user) return notFound();

    const team = await getTeamForUser(user.id);
    if (!team) return notFound();

    const planName = team.planName ?? 'Free';

    const plans = {
        Free: {
            name: 'Plano Free',
            features: ['Recursos básicos', 'Uso limitado', 'Suporte comunitário'],
            price: 'Gratuito',
        },
        Base: {
            name: 'Plano Base',
            features: ['Uso ilimitado', 'Membros ilimitados', 'Suporte por e-mail'],
            price: '$8 / mês',
        },
        Plus: {
            name: 'Plano Plus',
            features: [
                'Tudo do Base',
                'Acesso antecipado a recursos',
                'Suporte 24/7 + Slack privado',
            ],
            price: '$12 / mês',
        },
    };

    const current = plans[planName as keyof typeof plans];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Seu Plano Atual: {current.name}
            </h1>
            <p className="text-gray-700 mb-4">{current.price}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
                {current.features.map((f, i) => (
                    <li key={i}>{f}</li>
                ))}
            </ul>
        </div>
    );
}
