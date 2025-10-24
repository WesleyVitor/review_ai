
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query'
import {useEffect} from "react"
export default function ReviewHistory(params) {
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['reviews'], // cache key
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:8000/review_files/?token=${localStorage.getItem("user")}`)
    //         if (!res.ok) throw new Error('Erro ao buscar usuários')
    //         return res.json()
    //     },
    // })
    const data = {
        "files": [
            {
                "id":1,
                "name": "João",
                "link": "link"
            }
        ]
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Name
                    </TableHead>
                    <TableHead>
                        Actions
                    </TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>

                {
                    data?.files?.map(({ id, name, link }) => {
                        return (
                            <TableRow key={id}>
                                <TableCell>
                                    {name}
                                </TableCell>
                                <TableCell>
                                    <Button className="cursor-pointer" variant="outline">
                                        <a href={link}>Download</a>
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