import React, { useState } from "react";
import '../../assets/styles/pagination.css';

export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    currentItems,
    totalPages,
    handlePageChange,
    setCurrentPage // explicit setter if needed
  };
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const maxShown = 5;
    let start = Math.max(1, currentPage - Math.floor(maxShown / 2));
    let end = start + maxShown - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxShown + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      {getPages().map((page) => (
        <button
          key={page}
          className={`pagination-btn${page === currentPage ? " active" : ""}`}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;