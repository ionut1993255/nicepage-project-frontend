import React from "react";
import PreviousButton from "../buttons/previous-button-pagination/PreviousButton";
import NextButton from "../buttons/next-button-pagination/NextButton";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, handlePageChange }) {
  if (totalPages === 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="pagination">
      {isFirstPage ? null : (
        <PreviousButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
      )}

      <span>
        {currentPage} of {totalPages}
      </span>

      {isLastPage ? null : (
        <NextButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      )}
    </div>
  );
}

export default Pagination;
