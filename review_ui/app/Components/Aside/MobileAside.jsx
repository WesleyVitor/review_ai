
import { Globe, Handshake, Zap } from "lucide-react";

export default function MobileAside(params) {

    return (

        <aside className="flex justify-around items-center h-30 bg-green-200 text-white w-full">
            <div>
                <div className="flex gap-2">
                    <Handshake />
                    <span>Review AI</span>
                </div>
            </div>
            <div>
                <h1 className="text-3xl">Review Subjects Made <span className="text-green-50">Simple</span></h1>
                
            </div>
        </aside>


    );
}