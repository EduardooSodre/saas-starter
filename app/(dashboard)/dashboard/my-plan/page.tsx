// app/dashboard/meu-plano/page.tsx
import { getUserSession } from '@/lib/auth/session';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { notFound } from 'next/navigation';
import { SubmitButton } from '@/components/ui/submit-button';
import { getUserSubscription } from '@/lib/subscription';

export const dynamic = 'force-dynamic';


export default async function MeuPlanoPage() {
    const user = await getUserSession();

    if (!user) return notFound();

    const [prices, products] = await Promise.all([
        getStripePrices(),
        getStripeProducts(),
    ]);

    const basePlan = products.find((product) => product.name === 'Base');
    const plusPlan = products.find((product) => product.name === 'Plus');

    const basePrice = prices.find((price) => price.productId === basePlan?.id);
    const plusPrice = prices.find((price) => price.productId === plusPlan?.id);

    const isPlus = user.plan === 'plus';
    const currentPlan = isPlus ? plusPlan : basePlan;
    const currentPrice = isPlus ? plusPrice : basePrice;

    const nextPriceId = isPlus ? basePrice?.id : plusPrice?.id;
    const nextPlanName = isPlus ? 'Base' : 'Plus';

    const subscription = await getUserSubscription();

    const planName = subscription?.plan ?? 'Free';

    const attributes = {
        Base: [
            'Uso Ilimitado',
            'Membros Ilimitados',
            'Suporte por Email',
        ],
        Plus: [
            'Tudo do Base',
            'Acesso antecipado a novidades',
            'Suporte 24/7 + Slack',
        ],
        Free: [
            'Funcionalidades limitadas',
            'Sem suporte prioritário',
        ],
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-semibold mb-6">Seu Plano Atual</h1>

            <div className="border p-6 rounded-lg shadow-sm bg-white">
                <h2 className="text-xl font-medium">{isPlus ? 'Plus' : 'Base'} Plan</h2>
                <p className="text-gray-600 mb-4">
                    {currentPrice ? `$${(currentPrice.unitAmount || 0) / 100} / ${currentPrice.interval}` : 'Sem preço definido'}
                </p>

                <ul className="space-y-3 mb-6">
                    {attributes[planName as keyof typeof attributes].map((item, i) => (
                        <li key={i} className="text-gray-800 flex items-start">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2" />
                            {item}
                        </li>
                    ))}
                </ul>

                {nextPriceId && (
                    <form action="/api/checkout">
                        <input type="hidden" name="priceId" value={nextPriceId} />
                        <SubmitButton>
                            {isPlus ? 'Fazer downgrade para Base' : 'Fazer upgrade para Plus'}
                        </SubmitButton>
                    </form>
                )}
            </div>
        </div>
    );
}
