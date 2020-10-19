import React, { Component } from "react";
import {Column, SortColumn} from "../../types/types";

interface Props {
  columns: Column[];
  sortColumn: SortColumn;
  onSort: (arg: SortColumn) => void;
}

class TableHeader extends Component<Props> {
  raiseSort = (path: string) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}>
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  private renderSortIcon(column: Column) {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path || column.path === "") {
      return null;
    }

    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" />;
    }

    return <i className="fa fa-sort-desc" />;
  }
}

export default TableHeader;
