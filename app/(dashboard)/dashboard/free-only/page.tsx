import { getUserSubscription } from '@/lib/subscription';
import { notFound } from 'next/navigation';

export default async function FreeOnlyPage() {
  const subscription = await getUserSubscription();

  if (subscription) {
    notFound(); // Se tem uma assinatura, não pode ver essa página
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Usuário Gratuito</h1>
      <p className="text-gray-700">Você está usando a versão gratuita. Explore as funcionalidades básicas ou atualize para Plus!</p>
    </main>
  );
}
