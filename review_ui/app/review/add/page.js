'use client'
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from 'next/navigation';

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

import Aside from "../../Components/Aside/Aside"

export default function Page() {
    const isMobile = useIsMobile()
    const router = useRouter();
    
    return (
        <div className={`h-screen flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <Aside/>  
            <main className="flex-1 p-10 flex flex-col gap-10 justify-start items-center" >
                <div className="w-full pb-2" >
                    <Button onClick={()=>router.push("/dashboard")} className="flex cursor-pointer">
                        <ArrowBigLeft/>
                        <span>Histórico de Reviews</span>
                    </Button>
                </div>
                
            </main>
        </div>
    )
}