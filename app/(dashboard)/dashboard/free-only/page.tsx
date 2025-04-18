export const dynamic = "force-dynamic";

import { getUserSubscription } from '@/lib/subscription';
import { notFound } from 'next/navigation';



export default async function FreeOnlyPage() {
  const subscription = await getUserSubscription();

  if (subscription) {
    notFound(); // quem tem assinatura não pode acessar
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Plano Gratuito</h1>
      <p className="text-gray-700">Você está no plano gratuito. Aproveite os recursos básicos!</p>
    </div>
  );
}
