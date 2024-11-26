import { useState } from 'react';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  buildHeaderGroups,
} from '@tanstack/react-table';

const initialData: Record<string, string>[] = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
];

//fix for commit
const columns: ColumnDef<Record<string, string>>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
  },
  {
    accessorKey: 'assignee',
    header: 'Assignee',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

const Spreadsheet = () => {
  const [data, setData] = useState(initialData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  const newRow = () => {
    const newRowData: Record<string, any> = {};

    // Add default values for each column in the new row
    columns.forEach((col) => {
        if ('accessorKey' in col) {
            newRowData[col.accessorKey] = ''; 
        }
    });

    // Add the new row to the data state
    setData((prevData) => [...prevData, newRowData]);
  };


  
  const handleCellEdit = (rowIndex: number, columnId: string, value: any) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, [columnId]: value };
        }
        return row;
      })
    );
  };

  // Generate table headers with null checks
  const renderHeaders = () => {
    const headerGroups = table.getHeaderGroups();
    const headers = [];

    for (let i = 0; i < headerGroups.length; i++) {
      const headerGroup = headerGroups[i];
      if (!headerGroup || !headerGroup.headers) continue; // Skip if headerGroup or headers is undefined

      const headerCells = [];
      for (let j = 0; j < headerGroup.headers.length; j++) {
        const header = headerGroup.headers[j];
        if (!header) continue; // Skip if header is undefined

        headerCells.push(
          <th key={header.id} className="border border-gray-300 px-[1px] py-[1px] bg-blue-100 text-center">
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        );
      }
      headers.push(<tr key={headerGroup.id}>{headerCells}</tr>);
    }
    return headers;
  };

  // Generate table body with null checks
  const renderRows = () => {
    const rowModel = table.getRowModel();
    const rows = [];

    for (let i = 0; i < rowModel.rows.length; i++) {
      const row = rowModel.rows[i];
      if (!row || !row.getVisibleCells) continue; // Skip if row or getVisibleCells is undefined

      const cells = [];
      for (let j = 0; j < row.getVisibleCells().length; j++) {
        const cell = row.getVisibleCells()[j];
        if (!cell) continue; // Skip if cell is undefined
        if (j == 0) {
            cells.push(
                <td className="border border-gray-300 text-center">
                    {i + 1}
                </td>
            );
        } else {
            cells.push(
                <td key={cell.id} className="border border-gray-300 text-center">
                    <input
                    type="text"
                    value={cell.getValue() as string}
                    onChange={(e) =>
                        handleCellEdit(row.index, cell.column.id, e.target.value)
                    }
                    />
                </td>
            );
        }
        
      }
      rows.push(<tr key={row.id}>{cells}</tr>);
    }

    // const lastCell = []
    // const headerGroups = table.getHeaderGroups();
    // for (let i=0; i< headerGroups.length;i++) {
    //     lastCell.push(
    //             <td className="border border-gray-300 text-center">
    //                 <button onClick={() => {newRow();}}>+</button>
    //             </td>
    //         );
    // }

    const lastCell = (
        <td className="border border-gray-300 text-center">
            <button onClick={() => {newRow();}}>+</button>
        </td>
    );

    rows.push(<tr key={rowModel.rows.length}>{lastCell}</tr>);


    return rows;
  };

  return (
    <div>
      <table>
        <thead>{renderHeaders()}</thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
