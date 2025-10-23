'use client'
import { useRouter } from 'next/navigation';
import { useIsMobile } from "@/hooks/use-mobile";

import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Aside from "./Components/Aside/Aside";

const client = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function Page() {
  const isMobile = useIsMobile()
  const router = useRouter();
  
  return (

      <div className={`h-screen flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        <Aside/>  
        <main className="flex-1 p-6 flex justify-center items-center" >
          <GoogleOAuthProvider clientId={client}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                router.push("/dashboard")
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          </GoogleOAuthProvider>
        </main>
      </div>
    
    
  );
}