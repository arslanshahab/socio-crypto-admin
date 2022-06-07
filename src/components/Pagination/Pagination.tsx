import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.css';

type PaginationProps = {
  total: number;
  skip: number;
  take: number;
  getValue: (skip: number) => void;
};

const Pagination: FC<PaginationProps> = (props: PaginationProps) => {
  const { total = 10, skip = 0, take = 10, getValue } = props;

  // Take Paginated Value
  const handlePageClick = (event: { selected: number }) => {
    try {
      getValue(event.selected * take);
    } catch (e) {
      getValue(0);
    }
  };

  return (
    <div className={styles.paginateWrapper}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(total / take)}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
        initialPage={skip / take}
      />
    </div>
  );
};

export default Pagination;
