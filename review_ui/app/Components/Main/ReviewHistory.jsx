
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query'
import {useEffect} from "react"
export default function ReviewHistory(params) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['reviews'], // cache key
        queryFn: async () => {
            const res = await fetch(`http://localhost:8000/review/list`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (!res.ok) throw new Error('Erro ao buscar usuários')
            return res.json()
        },
        refetchOnMount: "always"
    })
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Name
                    </TableHead>
                    <TableHead>
                        Review Type
                    </TableHead>
                    <TableHead>
                        Actions
                    </TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>

                {
                    data?.files?.map(({ id, name, link, review_type }) => {
                        return (
                            <TableRow key={id}>
                                <TableCell>
                                    {name}
                                </TableCell>
                                <TableCell>
                                    {review_type}
                                </TableCell>
                                <TableCell>
                                    <Button className="cursor-pointer" variant="outline">
                                        <a target="_blank" href={link}>Download</a>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )

                    })
                }

            </TableBody>

        </Table>


    );
}