import { useEffect, useState } from 'react';
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
import { api } from '~/utils/api';
import { useRouter } from 'next/router';



//column initial accessor keys
const NameKey = String(uuidv4())
const NotesKey = String(uuidv4())
const AssigneeKey = String(uuidv4())
const StatusKey = String(uuidv4())

const defaultinitialData: Record<string, string>[] = [
  { uid: String(uuidv4()), [NameKey]:"Tset" },
  { uid: String(uuidv4()) },
  { uid: String(uuidv4()) },
  { uid: String(uuidv4()) },
  { uid: String(uuidv4()) },
];


const defaultcolumnType: Record<string, string> = {
  [NameKey]:"string", 
  [NotesKey]:"string",
  [AssigneeKey]:"string",
  [StatusKey]:"string"
}

//fix for commit
const defaultcolumnData: ColumnDef<Record<string, string>>[] = [
  {
    accessorKey: 'uid',
    header: '',
  },
  {
    accessorKey: NameKey,
    header: 'Name',
  },
  {
    accessorKey: NotesKey,
    header: 'Notes',
  },
  {
    accessorKey: AssigneeKey,
    header: 'Assignee',
  },
  {
    accessorKey: StatusKey,
    header: 'Status',
  },
];

interface BaseData {
  rows?: any[];
  cols?: any[];
  types?: Record<string, string>;
}

const Spreadsheet = () => {

  const router = useRouter();
  const { baseId, userId} = router.query;
  const baseIdString = String(baseId)

  const [columnType, setColumnType] = useState(defaultcolumnType);  
  const [data, setData] = useState(defaultinitialData);
  const [columns, setColumnData] = useState(defaultcolumnData);

  //might be something wrong with baseIdString
  const { data: base, isLoading, error } = api.base.getBaseById.useQuery({ baseId: baseIdString });
  
  useEffect(() => {
    // Only execute if baseIdString and base are valid
    if (baseIdString!= "undefined" && base != undefined && !isLoading) {
      const dbdata = base.baseData as BaseData
      
      // Check if rows, cols, and types are defined and have valid values
      const rows = dbdata.rows ?? null;
      const cols = dbdata.cols ?? null;
      const types = dbdata.types ?? null;

      // Update state only if the data has changed
      if (rows !== data || cols !== columns || types !== columnType) {
        if (rows != null && cols != null && types != null ) {
          setData(rows ?? defaultinitialData);
          setColumnData(cols ?? defaultcolumnData);
          setColumnType(types ?? defaultcolumnType);
          console.log("Updated data", JSON.stringify(rows, null, 2), cols, types);
        }
      }
    }
  }, [base, baseIdString]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // TRPC mutation for updating baseData
  const updateBaseMutation = api.base.updateBase.useMutation();
  
  
  useEffect(() => {
    const handler = setTimeout(() => {
    if (!isLoading && baseIdString != "undefined") {
      updateBaseMutation.mutate(
        { baseId: String(baseId), baseData: {rows:data, cols:columns, types: columnType} },
        {
          onSuccess: () => {
            console.log("Base data updated successfully.");
            console.log(JSON.stringify(data))
          },
          onError: (error) => {
            console.error("Error updating base data:", error.message);
          },
        }
    );
    }}, 500);

    return () => clearTimeout(handler);
  }, [data, columns, columnType]); // Trigger only when `data` changes


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

  const newStringCol = (name: string) => {
    setColumnData((prevColumnData) => {
      const newColId = String(uuidv4());
      const newCol = {
        accessorKey: newColId,
        header: name,
      }

      columnType[newColId] = "string";

      return [...prevColumnData, newCol]
    });
  }

  const newIntegerCol = (name: string) => {
    setColumnData((prevColumnData) => {
      const newColId = String(uuidv4());
      const newCol = {
        accessorKey: newColId,
        header: name,
      }

      columnType[newColId] = "integer";

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
  const sortAtoZ = (colId: string) => {
    setData((prevData) => {
      console.log(prevData)
        const sortedData = [...prevData].sort(
          (a, b) => {
            if (a[colId] !== undefined && b[colId] !== undefined) {
              if (a[colId] < b[colId]) return -1;  // a comes before b
              if (a[colId] > b[colId]) return 1;   // a comes after b
              return 0;                       // a and b are equal
            }
            return 0;
          }
        );
      console.log(sortedData)
      return sortedData
    }); 
  }


  const sortFirsttoLast = (colId: string) => {
    setData((prevData) => {
      console.log(prevData)
        const sortedData = [...prevData].sort(
          (a, b) => {
            if (a[colId] !== undefined && b[colId] !== undefined) {
              if (parseInt(a[colId], 10) < parseInt(b[colId], 10)) return -1;  // a comes before b
              if (parseInt(a[colId], 10) > parseInt(b[colId], 10)) return 1;   // a comes after b
              return 0;                       // a and b are equal
            }
            return 0;
          }
        );
      console.log(sortedData)
      return sortedData
    }); 
  }

  const sortLasttoFirst = (colId: string) => {
    setData((prevData) => {
      console.log(prevData)
        const sortedData = [...prevData].sort(
          (a, b) => {
            if (a[colId] !== undefined && b[colId] !== undefined) {
              if (parseInt(a[colId], 10) > parseInt(b[colId], 10)) return -1;  // a comes before b
              if (parseInt(a[colId], 10) < parseInt(b[colId], 10)) return 1;   // a comes after b
              return 0;                       // a and b are equal
            }
            return 0;
          }
        );
      console.log(sortedData)
      return sortedData
    }); 
  }

  const sortZtoA = (colId: string) => {
    setData((prevData) => {
      console.log(prevData)
        const sortedData = [...prevData].sort(
          (a, b) => {
            if (a[colId] !== undefined && b[colId] !== undefined) {
              if (a[colId] > b[colId]) return -1;  // a comes before b
              if (a[colId] < b[colId]) return 1;   // a comes after b
              return 0;                       // a and b are equal
            }
            return 0;
          }
        );
      console.log(sortedData)
      return sortedData
    }); 
  }

  
  const handleCellEdit = (rowIndex: number, columnId: string, value: string) => {
    const updatedData = [...data];
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [columnId]: value,
    };
    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = {
        ...newData[rowIndex],
        [columnId]: value,
      };
      return newData
    });
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
          if (columnType[header.column.id] == "integer") {
            headerCells.push(
              <th key={header.id} className="border border-gray-300 bg-blue-100 font-normal text-xs">
                <DropDowncol options={[{label:"Sort First -> Last", onClick:sortFirsttoLast}, {label:"Sort Last -> First", onClick: sortLasttoFirst}, {label:"Delete Column", onClick:delCol}]} 
                  text={String(flexRender(header.column.columnDef.header, header.getContext()))} 
                  colId={header.column.id}/>
              </th>);
          } else {
            headerCells.push(
              <th key={header.id} className="border border-gray-300 bg-blue-100 font-normal text-xs">
                <DropDowncol options={[{label:"Sort A -> Z", onClick:sortAtoZ}, {label:"Sort Z -> A", onClick: sortZtoA}, {label:"Delete Column", onClick:delCol}]} 
                  text={String(flexRender(header.column.columnDef.header, header.getContext()))} 
                  colId={header.column.id}/>
              </th>);
          }
        } else {
          if (columnType[header.column.id] == "integer") {
            headerCells.push(
            <th key={header.id} className="border border-gray-300 bg-blue-100 font-normal text-center text-xs">
              <DropDowncol options={[{label:"Sort First -> Last", onClick: sortFirsttoLast}, {label:"Sort Last -> First", onClick: sortLasttoFirst}, {label:"Delete Column", onClick:delCol}]} 
                text={""} colId={header.column.id}/>
              {/* {flexRender(header.column.columnDef.header, header.getContext())} */}
            </th>);
          } else {
            headerCells.push(
              <th key={header.id} className="border border-gray-300 bg-blue-100 font-normal text-center text-xs">
                <DropDowncol options={[{label:"Sort A -> Z", onClick: sortAtoZ}, {label:"Sort Z -> A", onClick: sortZtoA}, {label:"Delete Column", onClick:delCol}]} 
                  text={""} colId={header.column.id}/>
                {/* {flexRender(header.column.columnDef.header, header.getContext())} */}
              </th>);
          }
          
        }
       
        
      }

      const lastCell = (
          <th className="border border-gray-300 bg-blue-100 w-[70px] text-center text-xs font-normal">
            {/* <Dropdown options={[{label:'New Col', onClick: newCol}]} /> */}
            <Dropdown options={[{label:'New text column', onClick: newStringCol}, {label:'New number column', onClick: newIntegerCol}]} />
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
            if (columnType[cell.column.id] == "integer") {
              cells.push(
                <td key={cell.id} className="border border-gray-300 text-center">
                    <input
                    className='w-[150px] h-[22px] text-xs text-center'
                    type="number"
                    value={cell.getValue() as string} // for direct access use: data[row.index]?.[cell.column.id] ?? ""
                    onChange={(e) =>
                        handleCellEdit(row.index, cell.column.id, e.target.value)
                    }
                    />
                </td>
              );
            } else {
              cells.push(
                <td key={cell.id} className="border border-gray-300 text-center">
                    <input
                    className='w-[150px] h-[22px] text-xs text-center'
                    type="text"
                    value={cell.getValue() as string} //for direct access use: data[row.index]?.[cell.column.id] ?? ""
                    onChange={(e) =>
                        handleCellEdit(row.index, cell.column.id, e.target.value)
                    }
                    />
                </td>
              );
            }
            
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

  // const renderRows = () => {
  //   const rows = [];
  
  //   // Iterate over each row in `initialData`
  //   initialData.forEach((row, rowIndex) => {
  //     const cells: JSX.Element[] = [];
  
  //     // Iterate over each column in `columnData`
  //     columnData.forEach((column, cellIndex) => {
  //       const columnId = column.id; // Assuming columns have an `id` field
  
  //       if (cellIndex === 0) {
  //         // First column with DropDownTwo
  //         cells.push(
  //           <td className="border border-gray-300 text-center text-xs" key={columnId}>
  //             <DropDownTwo
  //               options={options}
  //               rowId={String(row.uid)} // Assuming `uid` exists in rows
  //               text={String(rowIndex + 1)}
  //             />
  //           </td>
  //         );
  //       } else {
  //         // Handle other columns based on their type
  //         if (column.type === "integer") {
  //           cells.push(
  //             <td key={columnId} className="border border-gray-300 text-center">
  //               <input
  //                 className="w-[150px] h-[22px] text-xs text-center"
  //                 type="number"
  //                 value={row[columnId]} // Access row data by column ID
  //                 onChange={(e) =>
  //                   handleCellEdit(rowIndex, columnId, e.target.value)
  //                 }
  //               />
  //             </td>
  //           );
  //         } else {
  //           cells.push(
  //             <td key={columnId} className="border border-gray-300 text-center">
  //               <input
  //                 className="w-[150px] h-[22px] text-xs text-center"
  //                 type="text"
  //                 value={row[columnId]} // Access row data by column ID
  //                 onChange={(e) =>
  //                   handleCellEdit(rowIndex, columnId, e.target.value)
  //                 }
  //               />
  //             </td>
  //           );
  //         }
  //       }
  //     });
  
  //     rows.push(<tr key={rowIndex}>{cells}</tr>);
  //   });
  
  //   // Add the last row for the "Add New Row" button
  //   rows.push(
  //     <tr key={initialData.length}>
  //       <td
  //         className="border border-gray-300 text-center"
  //         colSpan={columnData.length}
  //       >
  //         <button onClick={newRow} className="text-blue-500">
  //           +
  //         </button>
  //       </td>
  //     </tr>
  //   );
  
  //   return rows;
  // };
  

  const options = [
    { label: 'Delete Row', onClick: (rowId: string) => {delRow(rowId)}},
  ];

  return (
    <div>
      <table>
        {!isLoading && (
        <>
          <thead>{renderHeaders()}</thead>
          <tbody>{renderRows()}</tbody>
        </>
      )}
      </table>
    </div>
  );
};

export default Spreadsheet;
