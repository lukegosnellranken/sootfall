// NOTE: This file appears to be a boilerplate example demonstrating how to use the 'react-paginate' library.
// The actual pagination logic used in this application is implemented directly within other components, such as 'HomeCard.js'.
// This file serves as a helpful, self-contained reference for how pagination can be structured.

// We import the necessary tools from React.
import React, { useEffect, useState } from 'react';
// 'ReactPaginate' is the core component from the library we're using to create the page navigation.
import ReactPaginate from 'react-paginate';

// This is a hardcoded list of items to simulate fetching data from a server or database.
// In a real application, this array would be filled with data from an API call.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// This is a simple component whose only job is to render the items for the current page.
// It receives a prop called 'currentItems', which is an array of items to display.
function Items({ currentItems }) {
  return (
    <>
      {/* We check if 'currentItems' exists and then map over it. */}
      {currentItems &&
        currentItems.map((item) => (
          // For each item, we render a simple div.
          // In a real app, this would be a more complex component, like an article card.
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

// This is the main component that orchestrates the pagination logic.
// It determines which items to show and renders the page navigation controls.
function PaginatedItems({ itemsPerPage }) {
  // We use state to keep track of the 'itemOffset'. This is the starting index
  // in our main 'items' array for the items on the current page.
  const [itemOffset, setItemOffset] = useState(0);

  // --- Data Simulation Section ---
  // In a real app, you would fetch data from an API here, likely inside a 'useEffect' hook.
  // Here, we simulate that process by slicing our hardcoded 'items' array.
  const endOffset = itemOffset + itemsPerPage; // Calculate the ending index for the current page.
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset); // Get the items for the current page.
  const pageCount = Math.ceil(items.length / itemsPerPage); // Calculate the total number of pages.
  // --- End of Data Simulation ---

  // This function is called by 'ReactPaginate' whenever the user clicks on a page number.
  const handlePageClick = (event) => {
    // 'event.selected' gives us the new page number (which is zero-indexed).
    // We calculate the new 'itemOffset' based on the selected page and items per page.
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    // We update the state, which will cause the component to re-render with the new items.
    setItemOffset(newOffset);
  };

  // This is the JSX that gets rendered.
  return (
    <>
      {/* We render the 'Items' component, passing it the items for the currently selected page. */}
      <Items currentItems={currentItems} />
      {/* We render the 'ReactPaginate' component to display the navigation buttons. */}
      <ReactPaginate
        breakLabel="..." // The label for the ellipsis (...) when page numbers are skipped.
        nextLabel="next >" // The label for the 'next' button.
        onPageChange={handlePageClick} // The function to call when a page is clicked.
        pageRangeDisplayed={5} // How many page numbers to show in the center.
        pageCount={pageCount} // The total number of pages.
        previousLabel="< previous" // The label for the 'previous' button.
        renderOnZeroPageCount={null} // If there are no pages, render nothing.
      />
    </>
  );
}

// We export the main 'PaginatedItems' component.
export default PaginatedItems;