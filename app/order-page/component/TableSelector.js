import { useState } from "react";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useGetAllTables } from "@/hooks/table/useGetAllTables";

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
      <SelectContent>
        {tables.map((table) => (
          <SelectItem key={table._id} value={table._id}>
            Sequence {table.sequence}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TableSelector;
