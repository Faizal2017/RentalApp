import React from "react";

const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8 space-x-4 ">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>

      <span className="text-lg font-medium text-gray-700">
        Page {page} of {totalPages}
      </span>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;