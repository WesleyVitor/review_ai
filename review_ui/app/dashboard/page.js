'use client'

import { useIsMobile } from "@/hooks/use-mobile";

import { ArrowBigLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { googleLogout } from '@react-oauth/google';

import { Button } from "@/components/ui/button";
import ReviewHistory from "../Components/Main/ReviewHistory";
import Aside from "../Components/Aside/Aside";

export default function Page() {
    const isMobile = useIsMobile()
    const router = useRouter();
    const logout = ()=>{
        googleLogout();
        router.push("/");
    }
    
    return (
        <div className={`h-screen flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <Aside/>  
            <main className="flex-1 p-10 flex flex-col gap-10 justify-start items-center" >
                <div className="w-full pb-2" >
                    <Button onClick={logout} className="flex cursor-pointer">
                        <ArrowBigLeft/>
                        <span>Logout</span>
                    </Button>
                </div>
                <div className="relative w-full flex justify-center">
                    <h1 className="text-2xl">Histórico de Reviews</h1>
                    <Button variant="outline" className="absolute right-1 cursor-pointer" onClick={()=>router.push("/review/add")}>
                        Gerar Outro Review
                    </Button>
                </div>
                <ReviewHistory/>
            </main>
        </div>
    )
}