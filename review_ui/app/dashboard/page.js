'use client'

import {useEffect, useState} from 'react';

import { useIsMobile } from "@/hooks/use-mobile";

import { ArrowBigLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { googleLogout } from '@react-oauth/google';

import { Button } from "@/components/ui/button";
import ReviewHistory from "../Components/Main/ReviewHistory";
import Aside from "../Components/Aside/Aside";
import Fallback from "../fallback";
import DialogForm from '../Components/Main/DialogForm';


export default function Page() {
    const isMobile = useIsMobile()
    const router = useRouter();
    

    const logout = ()=>{
        googleLogout();
        router.push("/");
        localStorage.clear()
    }
    
    return (
        <div className={`h-screen flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <Aside/>  
            <Fallback>
                <main className="flex-1 p-10 flex flex-col gap-10 justify-start items-center" >
                    <div className="w-full pb-2" >
                        <Button onClick={logout} className="flex cursor-pointer">
                            <span>Logout</span>
                        </Button>
                    </div>
                    <div className="relative w-full flex justify-center">
                        <h1 className="text-2xl">Reviews History</h1>
                        <div className="absolute right-1">
                            <DialogForm/>

                        </div>
                        
                    </div>
                    <ReviewHistory/>
                </main>
            </Fallback>
            
        </div>
    )
}