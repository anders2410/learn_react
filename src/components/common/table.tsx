import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import {Column, SortColumn} from "../../types/types";

interface Props {
  sortColumn: SortColumn;
  columns: Column[];
  data: any[];
  onSort: (arg: SortColumn) => void;
}

const Table = ({ columns, data, sortColumn, onSort }: Props) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
