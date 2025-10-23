import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from 'lucide-react';

export default function ErrorPermission() {
    const router = useRouter();
    return (
        <div className="p-6 text-center text-red-600 flex-1 flex flex-col gap-10 justify-start items-center">
            <div className="w-full pb-2" >
                <Button onClick={()=>router.push("/")} className="flex cursor-pointer">
                    <ArrowBigLeft />
                    <span>LogIN</span>
                </Button>
            </div>
            <h1>Sem permissão!</h1>
            <p>Você precisa estar logado para acessar esta página.</p>
        </div>
    );
}