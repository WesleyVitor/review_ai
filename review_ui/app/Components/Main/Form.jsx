'use client'
import {Paperclip} from "lucide-react";
export default function Form(params) {
    return (
        <form className="w-full">
            <div className="space-y-12 flex flex-col justify-start w-full">
                
                <div className="flex flex-col justify-start gap-2 w-full">
                    <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Subject</label>
                    <input id="username" type="text" name="username" placeholder="Add your tópic subject" className="border border-gray-900 rounded-2xl block min-w-0 grow bg-white py-1.5 pr-4 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                </div>
                <div className="flex flex-col justify-start gap-2 text-start">

                    <label htmlFor="file" className="block text-sm/6 font-medium text-gray-900">Send file</label>
                    <div className="border border-gray-400 border-dashed py-6 px-10 cursor-pointer">
                        <label className="relative flex flex-col justify-center items-center gap-1 text-sm cursor-pointer">
                            <Paperclip/>
                            <span>Upload a file</span>
                            <input name="file" id="file" type="file" placehold="Tópico a ser revisado" className="sr-only"/>
                        </label>
                    </div>
                </div>
                <button className="py-3 px-2 text-black bg-green-50 font-normal text-xs rounded-sm cursor-pointer" >Generate</button>
            </div>
        </form>
    );
}