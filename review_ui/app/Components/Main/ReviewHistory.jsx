
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ReviewHistory(params) {
    const lista = [
        {
            "id": '12',
            "name": "Jonas",
            "link": "link"
        },
        {
            "id": '13',
            "name": "Jonas",
            "link": "link"
        }
    ]


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
                    lista.map(({ id, name, link }) => {
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