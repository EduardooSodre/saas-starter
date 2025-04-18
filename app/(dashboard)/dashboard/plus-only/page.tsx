export const dynamic = "force-dynamic";

import { getUserSubscription } from "@/lib/subscription";
import { notFound } from "next/navigation";

export default async function PlusOnlyPage() {
    const subscription = await getUserSubscription();

    if (subscription?.plan !== "Plus") {
        notFound(); // ou use redirect("/pricing")
    }

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-4">Conteúdo Plus</h1>
            <p className="text-gray-700">Você tem acesso ao plano Plus.</p>
        </div>
    );
}
