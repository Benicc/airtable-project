import { useState } from 'react';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  buildHeaderGroups,
} from '@tanstack/react-table';
import Dropdown from './dropdown';
import DropDownTwo from './dropdownTwo';
import { v4 as uuidv4 } from 'uuid';
import DropDowncol from './colDropDown';

const initialData: Record<string, string>[] = [
  { uid: String(uuidv4()) },
  { uid: String(uuidv4()) },
  { uid: String(uuidv4()) },
  { uid: String(uuidv4()) },
  { uid: String(uuidv4()) },
];

//fix for commit
const columnData: ColumnDef<Record<string, string>>[] = [
  {
    accessorKey: 'uid',
    header: '',
  },
  {
    accessorKey: String(uuidv4()),
    header: 'Name',
  },
  {
    accessorKey: String(uuidv4()),
    header: 'Notes',
  },
  {
    accessorKey: String(uuidv4()),
    header: 'Assignee',
  },
  {
    accessorKey: String(uuidv4()),
    header: 'Status',
  },
];

const Spreadsheet = () => {
  const [data, setData] = useState(initialData);
  const [columns, setColumnData] = useState(columnData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  const newRow = () => {
    const newRowData: Record<string, string> = {};


    // Add the new row to the data state
    setData((prevData) => {
      columns.forEach((col) => {
      if ('accessorKey' in col) {
        if (col.accessorKey == 'uid') {
          newRowData[col.accessorKey] = String(uuidv4());
        } else {
          newRowData[col.accessorKey] = ''; 
        }
      }
      });

      return [...prevData, newRowData]
    });

    // console.log(data)
  };

  const delRow = (rowId: string) => {

    // Add the new row to the data state
    setData((prevData) => {
      // let items = null;
      // const newRowData = prevData.filter(item => () => {item.id != rowId, items = item.id;});
      // console.log(items);
      // console.log(prevData);
      // console.log(newRowData);
      // console.log(prevData)
      return prevData.filter(item => item.uid !== rowId);
    });
  };

  const newCol = (name: string) => {
    setColumnData((prevColumnData) => {
      const newCol = {
        accessorKey: String(uuidv4()),
        header: name,
      }

      return [...prevColumnData, newCol]
    });
  }

  //todo
  const delCol = (colId: string) => {
    // Add the new row to the data state
    console.log(colId);
    setColumnData((prevColumnData) => {
      return prevColumnData.filter(item => (item as any).accessorKey !== colId);
    });

    console.log(columns)
  };

// Sort the data by the 'uid' field in descending order
  // const sortHightoLow = (colId: string) => {
  //   setData((prevData) => {
  //     const sortedColumnData = [...columnData].sort((a,b) => {
  //     if (addEventListener.accessorKey && buildHeaderGroups[colId]) {
  //       return a.accessorKey.localeCompare(b.accessorKey);
  //     }});
  //   }); 
  // }

  
  const handleCellEdit = (rowIndex: number, columnId: string, value: string) => {
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

        // console.log(header.column);
        if (j == 0) {
          headerCells.push(<th className="border border-gray-300 bg-blue-100 font-normal text-xs">{" "}</th>)
        } else if (flexRender(header.column.columnDef.header, header.getContext()) != null) {
          headerCells.push(
            <th key={header.id} className="border border-gray-300 bg-blue-100 font-normal text-xs">
              <DropDowncol options={[{label:"Sort First -> Last", onClick: newCol}, {label:"Sort Last -> First", onClick: newCol}, {label:"Delete Column", onClick:delCol}]} 
                text={String(flexRender(header.column.columnDef.header, header.getContext()))} 
                colId={header.column.id}/>
              {/* {flexRender(header.column.columnDef.header, header.getContext())} */}
            </th>);
        } else {
          headerCells.push(
            <th key={header.id} className="border border-gray-300 bg-blue-100 font-normal text-center text-xs">
              <DropDowncol options={[{label:"Sort First -> Last", onClick: newCol}, {label:"Sort Last -> First", onClick: newCol}, {label:"Delete Column", onClick:delCol}]} 
                text={""} colId={header.column.id}/>
              {/* {flexRender(header.column.columnDef.header, header.getContext())} */}
            </th>);
        }
       
        
      }

      const lastCell = (
          <th className="border border-gray-300 bg-blue-100 w-[70px] text-center text-xs font-normal">
            {/* <Dropdown options={[{label:'New Col', onClick: newCol}]} /> */}
            <Dropdown options={[{label:'Create New Column', onClick: newCol}]} />
            {/* <button onClick={() => {newRow();}} className='w-full h-full'><p>+</p></button> */}
          </th>
      );
  
      // headerCells.push(<tr key={headerGroups.length}>{lastCell}</tr>);
      headers.push(<tr key={headerGroup.id}>{headerCells}{lastCell}</tr>);
    }


    return headers;
  };

  // Generate table body with null checks
  const renderRows = () => {
    const rowModel = table.getRowModel();
    const rows = [];

    // console.log(rowModel);

    for (let i = 0; i < rowModel.rows.length; i++) {
      const row = rowModel.rows[i];
      if (!row || !row.getVisibleCells) continue; // Skip if row or getVisibleCells is undefined

      const cells = [];
      for (let j = 0; j < row.getVisibleCells().length; j++) {
        const cell = row.getVisibleCells()[j];
        if (!cell) continue; // Skip if cell is undefined
        if (j == 0) {
            cells.push(
                <td className="border border-gray-300 text-center text-xs">
                    <DropDownTwo options={options} rowId={String(row.original.uid)} text={String(i + 1)}/>
                </td>
            );
        } else {
            cells.push(
                <td key={cell.id} className="border border-gray-300 text-center">
                    <input
                    className='w-[150px] h-[22px] text-xs text-center'
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

    const lastCell = (
        <td className="border border-gray-300 text-center">
            <button onClick={() => {newRow();}}>+</button>
        </td>
    );

    rows.push(<tr key={rowModel.rows.length}>{lastCell}</tr>);


    return rows;
  };

  const options = [
    { label: 'Delete Row', onClick: (rowId: string) => {delRow(rowId)}},
  ];

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
