// This line marks this as a Client Component, which is necessary for using React hooks
// like 'useState', 'useEffect', and for handling user interactions like clicking on pagination buttons.
"use client";

// We're importing the necessary React hooks for managing state and side effects.
import { useState, useEffect, useRef } from "react";
// We import the specific styles for this component.
import './HomeCard.scss';
// 'HomeCardContent' is the component that will render the details of each individual article in the list.
import HomeCardContent from "../home-card-content/HomeCardContent";
// 'dynamic' is a feature from Next.js that allows us to load components only when they are needed on the client-side.
import dynamic from 'next/dynamic';
// We are dynamically importing the 'ReactPaginate' component. This is a popular library for creating pagination.
// We set 'ssr: false' because pagination is a purely client-side interaction and doesn't need to be rendered on the server.
const ReactPaginate = dynamic(
    () => import('react-paginate').then((mod) => mod.default),
    { ssr: false }
);

// This is the 'HomeCard' component. It's a major component used to display a list of articles
// with pagination controls, allowing users to navigate through many articles page by page.
function HomeCard(props) {
    // We use 'useState' to store the full list of articles that are passed in via props.
    let [initDataArray, setInitDataArray] = useState([]);
    // 'useRef' gives us a way to get a direct reference to a specific element in the DOM (the pagination container).
    const paginationRef = useRef(null);

    // This 'useEffect' hook watches for changes in the 'props.articles'.
    // If the list of articles from the parent component changes, we update our internal state.
    useEffect(() => {
        setInitDataArray(props.articles);
    }, [props.articles])
    
    // This is a nested component responsible for the entire pagination logic and display.
    // It receives 'itemsPerPage' to know how many articles to show on each page.
    function PaginatedItems({ itemsPerPage }) {
        // 'currentItems' will hold the subset of articles for the currently visible page.
        let [currentItems, setCurrentItems] = useState([]);
        // 'pageCount' will hold the total number of pages needed.
        const [pageCount, setPageCount] = useState(0);
        // 'itemOffset' is the starting index in the main 'initDataArray' for the current page.
        const [itemOffset, setItemOffset] = useState(0);
        
        // This 'useEffect' hook runs whenever the 'itemOffset' or 'itemsPerPage' changes.
        // Its job is to calculate which articles should be displayed on the current page.
        useEffect(() => {
            // It calculates the ending index for the slice of articles.
            const endOffset = itemOffset + itemsPerPage;
            // It calculates the total page count based on the total number of articles and items per page.
            setPageCount(Math.ceil(initDataArray.length / itemsPerPage));
            // It slices the main array to get just the items for the current page and updates the state.
            setCurrentItems(initDataArray.slice(itemOffset, endOffset));
        }, [itemOffset, itemsPerPage]);

        // This function is called when a user clicks on a page number in the pagination controls.
        const handlePageClick = (event) => {
            // 'event.selected' gives us the new page number (zero-based).
            // We calculate the new 'itemOffset' needed to display the correct items for that page.
            const newOffset = event.selected * itemsPerPage % initDataArray.length;
            setItemOffset(newOffset);
        };

        // This is the JSX for the paginated items section.
        return (
            <div id="div-homecard-items-pagination">
                <div id="div-homecard-items">
                    {/* We render the 'Items' component, passing it the articles for the current page. */}
                    <Items currentItems={currentItems} />
                    {/* This div holds the actual pagination controls. We attach our ref here. */}
                    <div id="div-homecard-pagination" ref={paginationRef}>
                        <ReactPaginate
                            // These props configure the appearance and behavior of the pagination component.
                            nextLabel=">" // The text/icon for the 'next' button.
                            onPageChange={handlePageClick} // The function to call when a page is changed.
                            pageRangeDisplayed={3} // How many page numbers to show at a time.
                            marginPagesDisplayed={2} // How many pages to show at the beginning and end.
                            pageCount={pageCount} // The total number of pages.
                            previousLabel="<" // The text/icon for the 'previous' button.
                            pageClassName="page-item" // CSS classes for styling.
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active" // The class for the currently active page.
                            renderOnZeroPageCount={null} // Don't render anything if there are no pages.
                        />
                    </div>
                </div>
            </div>
        );
    }

    // This is another nested component. Its only job is to take a list of items ('currentItems')
    // and render a 'HomeCardContent' component for each one.
    function Items({ currentItems }) {
        // This 'useEffect' hook is a small fix to improve accessibility and styling.
        // It runs after the component renders and removes the 'tabindex' attribute from the pagination
        // buttons, which can prevent an unsightly blue focus outline on some browsers.
        useEffect(() => {
            if (paginationRef.current) {
                let list = paginationRef.current.querySelectorAll(".page-link");
                list.forEach(item => {
                    item.removeAttribute("tabindex");
                });
            }
        });

        // This is a helper function to create a URL-friendly "slug" from an article title.
        // It converts the title to lowercase, replaces spaces with hyphens, and removes most special characters.
        const generateSlug = (title) => {
            return title.replace(/\s+/g, '-').toLowerCase().replace(/[^a-zA-Z0-9-_]/g, "");
        };

        // This JSX maps over the articles for the current page and renders them.
        return (
            <div id="div-homecard-article-card">
                {currentItems.map((article, i) => (
                    // React requires a unique 'key' for each item in a list.
                    <div key={i}>
                        <HomeCardContent
                            key={i}
                            // We pass all the necessary data for the article down to the 'HomeCardContent' component.
                            sub={`/articles/${generateSlug(article.title)}`}
                            title={article.title}
                            date={article.dateString}
                            image={article.image}
                            tags={article.tags}
                            author={article.author}
                        />
                    </div>
                ))}
            </div>
        );
    }

    // This is the main JSX for the entire 'HomeCard' component.
    return (
        <div id="div-homecard-card">
            <div id="div-homecard-stitch">
                {/* This div displays the title passed in as a prop (e.g., "All Writings"). */}
                <div id="div-homecard-title">
                    <h1 id="h1-homecard-title" className="section-title">{props.title}</h1>
                </div>
                {/* A decorative separator. */}
                <div id="div-stitchBottom"></div>
                {/* Finally, we render the 'PaginatedItems' component to show the articles and pagination controls. */}
                <PaginatedItems itemsPerPage={3} />
            </div>
        </div>
    );
}

// We export the HomeCard component so it can be used on various pages.
export default HomeCard;