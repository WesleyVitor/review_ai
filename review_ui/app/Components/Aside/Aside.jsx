
import { Globe, Handshake, Zap } from "lucide-react";
import {useState, useEffect} from 'react';
import DesktopAside from "./DesktopAside";
import MobileAside from "./MobileAside";
import {useIsMobile} from '@/hooks/use-mobile'
export default function Aside(params) {
    const isMobile = useIsMobile()
    
    
    return (
        <>
            {!isMobile ? 
                <DesktopAside/>
                :
                <MobileAside/>
            }

            
        </>


    );
}