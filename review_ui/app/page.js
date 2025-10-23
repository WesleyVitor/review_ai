'use client'


import Aside from "./Components/Aside/Aside";
import { useIsMobile } from "@/hooks/use-mobile";
export default function Page() {
  const isMobile = useIsMobile()
  return (

      <div className={`h-screen flex ${isMobile ? 'flex-col' : 'flex-row1'}`}>
        
        <Aside/>  
        
        <main className="" >

          oi como vai?
        </main>
      </div>
    
    
  );
}