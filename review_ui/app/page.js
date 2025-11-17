'use client'
import { useRouter } from 'next/navigation';
import { useIsMobile } from "@/hooks/use-mobile";

import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Aside from "./Components/Aside/Aside";
import { useMutation } from "@tanstack/react-query";
const client = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const HOST = process.env.NEXT_PUBLIC_HOST_API;
export default function Page() {
  const isMobile = useIsMobile()
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const url = `${HOST}/auth/google`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao autenticar");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Sucesso na autenticação
      console.log("Login bem-sucedido:", data);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Erro na autenticação:", error);
    },
  });
  const onSuccess = (credentialResponse)=>{
    mutation.mutate({"token":credentialResponse.credential});
  }

  return (

      <div className={`h-screen flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        <Aside/>  
        <main className="flex-1 p-6 flex justify-center items-center" >
          <GoogleOAuthProvider clientId={client}>
            <GoogleLogin
              onSuccess={onSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
              
              
            />
          </GoogleOAuthProvider>
        </main>
      </div>
    
    
  );
}