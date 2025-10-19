'use client'
import { Globe, Handshake, Zap } from "lucide-react";
export default function Aside() {
    return (
        <aside className="w-1/3 pl-6 pr-20 pt-6 pb-20 bg-green-200 flex-col space-y-24">
        <nav className="flex justify-between items-center">
          <div className="flex gap-4 text-white">
           <Handshake/>
           <span>Review AI</span>
          </div>
          <button className="hidden py-3 px-2 text-black bg-green-50 font-normal text-xs rounded-sm cursor-pointer" >Get Started</button>
        </nav>
        <div className="flex-col space-y-3">
          <h1 className="text-4xl text-white">Review Subjects Made <span className="block text-green-50">Simple</span></h1>
          <p className="text-gray-second text-xs">reviews and exercises about anyone subject by file pdf</p>
        </div>
        <div>
          <p className="text-green-50 text-xs">Our offering</p>
          <div className="flex gap-2 mt-2">
            <button className="p-4 bg-green-150 flex-col rounded">
                <Zap/>
                <p>Review Subject</p>
            </button>
            <button className="p-4 bg-green-150 flex-col rounded">
                <Globe/>
                <p>Complete Review</p>
            </button>
            
          </div>
        </div>
        <nav >
          <ul className="flex gap-2 text-xs">
            <li className="text-green-50">
                <a target="_blank" href="https://www.linkedin.com/in/wesleydemorais/">LinkedIn</a>
            </li>
            <li className="text-green-50">
                <a target="_blank" href="https://dev.to/wesleymorais">Dev.to</a>
            </li>
            <li className="text-green-50">
                <a target="_blank" href="https://medium.com/@wesleydemorais">Medium</a>
            </li>
            
            
          </ul>
        </nav>
      </aside>
    );
}