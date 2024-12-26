// import { useState } from "react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { useGetAllTables } from "@/hooks/table/useGetAllTables";

// const TableSelector = ({ selectedTable, setSelectedTable }) => {
//   const { loading, tables } = useGetAllTables();

//   if (loading) {
//     return <p>Loading tables...</p>;
//   }

//   return (
//     <Select
//       onValueChange={(value) => {
//         const selected = tables.find((table) => table._id === value);
//         setSelectedTable(selected?._id || null);
//       }}
//       value={selectedTable}
//     >
//       <SelectTrigger>
//         <SelectValue placeholder="Select a table sequence" />
//       </SelectTrigger>
//       <SelectContent>
//         {tables.map((table) => (
//           <SelectItem key={table._id} value={table._id}>
//             <div
//               className={`${
//                 table.status == "free" ? " " : "bg-red-200"
//               } flex justify-between`}
//             >
//               <div>Table - {table.sequence}</div>
//               <div>
//                 {table.status != "free" && (
//                   <div className=" self-end">{`  ${table?.customer?.name}`}</div>
//                 )}
//               </div>
//             </div>
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// };

// export default TableSelector;

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetAllTables } from "@/hooks/table/useGetAllTables";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const TableSelector = ({ selectedTable, setSelectedTable }) => {
  const { loading, tables } = useGetAllTables();

  if (loading) {
    return <p>Loading tables...</p>;
  }

  return (
    <Select
      onValueChange={(value) => {
        const selected = tables.find((table) => table._id === value);
        setSelectedTable(selected?._id || null);
      }}
      value={selectedTable}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a table sequence" />
      </SelectTrigger>
      <TooltipProvider>
        <SelectContent className="space-y-2 flex flex-col">
          {tables.map((table) => (
            <SelectItem value={table._id} className="flex flex-col items-start">
              <Tooltip key={table._id}>
                <TooltipTrigger>
                  <div
                    className={`flex justify-between items-center w-full ${
                      table.status === "free" ? "bg-green-50" : "bg-red-50"
                    } p-2 rounded`}
                  >
                    <div className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          table.status === "free"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span>Table - {table.sequence}</span>
                    </div>
                  </div>
                </TooltipTrigger>
                {table.status !== "free" && (
                  <TooltipContent>
                    <p>{table?.customer?.name}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </SelectItem>
          ))}
        </SelectContent>
      </TooltipProvider>
    </Select>
  );
};

export default TableSelector;
