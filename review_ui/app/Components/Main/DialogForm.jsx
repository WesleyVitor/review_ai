'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";


export default function DialogForm() {
    const [open, setOpen] = useState(false)
    const fileRef = useRef(null);
    const [subject, setSubject] = useState("");
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (formData) => {
            const url = "http://localhost:8000/review/add"
            const response = await fetch(url, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!response.ok) {
                throw new Error("erro!");
            }
            
            
            return response.json();
        },
        onSuccess: (data) => {
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
        onError: (error) => {
            console.error("Erro ao add:", error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("term", subject);
        formData.append("file", fileRef.current.files[0]);
        
        mutation.mutate(formData);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form id="review-form"  onSubmit={handleSubmit}>
                <DialogTrigger asChild className="cursor-pointer">
                    <Button variant="outline">Generate Review</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Generate New Review</DialogTitle>
                        <DialogDescription>
                            Add subject and the PDF file to generate review. Click generate when you have done
                            
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="subject">Subject</Label>
                            <Input onChange={(e) => setSubject(e.target.value)} value={subject} id="subject" name="subject" type="text" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="file_pdf">Upload file</Label>
                            <Input ref={fileRef} id="file_pdf" name="file_pdf" type="file" className="cursor-pointer"/>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button form="review-form" disabled={mutation.isPending} type="submit">{mutation.isPending ? <Spinner/> : "Generate"}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}