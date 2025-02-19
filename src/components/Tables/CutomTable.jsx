import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CustomTable({data, columns}) {
  return (
    <div className="rounded-md border">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className="whitespace-nowrap">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex} className="whitespace-nowrap">
                  {typeof column.accessorKey === "function"
                    ? column.accessorKey(row)
                    : row[column.accessorKey]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
