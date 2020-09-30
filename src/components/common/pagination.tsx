import React from "react";
// @ts-ignore
import lodash from "lodash";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: any) => void;
}

const Pagination = (props: Props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount: number = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = lodash.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page: number) => (
          <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
