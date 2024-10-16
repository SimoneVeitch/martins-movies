import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getDisplayedPages = () => {
    const pages = [];
    const startPage = Math.floor((currentPage - 1) / 3) * 3 + 1;

    for (let i = 0; i < 3; i++) {
      const pageNum = startPage + i;
      if (pageNum <= totalPages) {
        pages.push(pageNum);
      }
    }
    return pages;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <a
          className="pagination-link"
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;
        </a>
      )}
      {getDisplayedPages().map((page) => (
        <a
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "current-page" : "pagination-link"}
        >
          {page}
        </a>
      ))}
      <a
        className="pagination-link"
        onClick={() => onPageChange(currentPage + 1)}
        style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }}
      >
        &gt;
      </a>
    </div>
  );
};

export default Pagination;
