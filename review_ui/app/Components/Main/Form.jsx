'use client'
import { useMutation } from "@tanstack/react-query";
import {Paperclip} from "lucide-react";

import {useRef, useState} from "react";

const HOST = process.env.NEXT_PUBLIC_HOST_API;

export default function Form(params) {
    const fileRef = useRef(null);
    const [subject, setSubject ] = useState("");

    const mutation = useMutation({
        mutationFn: async (formData)=>{
            const url = `${HOST}/review/`
            const response = await fetch(url, {
                method:"POST",
                body:formData
            });
            if (!response.ok){
                throw new Error("erro!");
            }
            console.log(response.json());
            return response.json();
        }
    });

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("term", subject);
        formData.append("file", fileRef.current.files[0]);

        mutation.mutate(formData);
    }


    
    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="space-y-12 flex flex-col justify-start w-full">
                
                <div className="flex flex-col justify-start gap-2 w-full">
                    <label htmlFor="subject" className="block text-sm/6 font-medium text-gray-900">Subject</label>
                    <input 
                        onChange={(e)=>setSubject(e.target.value)}
                        value={subject}
                        id="subject" 
                        type="text" 
                        name="subject" 
                        placeholder="Add your tópic subject" 
                        className="border border-gray-900 rounded-2xl block min-w-0 grow bg-white 
                        py-1.5 pr-4 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" 
                    />
                </div>
                <div className="flex flex-col justify-start gap-2 text-start">

                    <label htmlFor="file" className="block text-sm/6 font-medium text-gray-900">Send file</label>
                    <div className="border border-gray-400 border-dashed py-6 px-10 cursor-pointer">
                        <label className="relative flex flex-col justify-center items-center gap-1 text-sm cursor-pointer">
                            <Paperclip/>
                            <span>Upload a file</span>
                            <input 
                                ref={fileRef}
                                name="file" 
                                id="file" 
                                type="file" 
                                placehold="Tópico a ser revisado" 
                                className="sr-only"
                            />
                        </label>
                    </div>
                </div>
                
                <button disabled={mutation.isPending} className="py-3 px-2 text-black bg-green-50 font-normal text-xs rounded-sm cursor-pointer" >
                    {mutation.isPending ? "Gerando": "Generate"}
                </button>
                
            </div>
        </form>
    );
}