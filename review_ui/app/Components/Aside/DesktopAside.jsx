
import { Globe, Handshake, Zap } from "lucide-react";

export default function DesktopAside(params) {
    
    return (

        <aside
            className={`max-w-1/3  text-white bg-green-200 flex flex-col justify-between p-4 min-w-1/3`}
        >
            <div>
                <div className="flex gap-2">
                    <Handshake />
                    <span>Review AI</span>
                </div>
            </div>
            <div>
                <h1 className="text-6xl">Review Subjects Made <span className="text-green-50">Simple</span></h1>
                <p className="text-xs">Reviews and exercises about anyone subject by file PDF</p>
            </div>
            <div className="flex gap-2" >
                <button className="cursor-pointer">
                    <a>LinkedIn</a>
                </button>
                <button className="cursor-pointer">
                    <a>Dev.to</a>
                </button>
                <button className="cursor-pointer">
                    <a>Medium</a>
                </button>
            </div>
        </aside>


    );
}