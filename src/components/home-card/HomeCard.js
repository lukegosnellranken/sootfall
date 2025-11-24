"use client";

import { useState, useEffect, useRef } from "react";
import './HomeCard.scss';
import HomeCardContent from "../home-card-content/HomeCardContent";
import dynamic from 'next/dynamic';
const ReactPaginate = dynamic(
    () => import('react-paginate').then((mod) => mod.default),
    { ssr: false }
);

function HomeCard(props) {
    let [initDataArray, setInitDataArray] = useState([]);
    const paginationRef = useRef(null);

    useEffect(() => {
        setInitDataArray(props.articles);
    }, [props.articles])
    
    function PaginatedItems({ itemsPerPage }) {
        // We start with an empty list of items.
        let [currentItems, setCurrentItems] = useState([]);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);
        
        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            setPageCount(Math.ceil(initDataArray.length / itemsPerPage));
            setCurrentItems(initDataArray.slice(itemOffset, endOffset));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % initDataArray.length;
            setItemOffset(newOffset);
        };

        return (
            <div id="div-homecard-items-pagination">
                <div id="div-homecard-items">
                    <Items currentItems={currentItems} />
                    <div id="div-homecard-pagination" ref={paginationRef}>
                        <ReactPaginate
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={pageCount}
                            previousLabel="<"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>
        );
    }

    function Items({ currentItems }) {
        // Remove tabindex from each element with the page-link class
        // This removes unsightly blue boxes around the pagination buttons
        useEffect(() => {
            if (paginationRef.current) {
                let list = paginationRef.current.querySelectorAll(".page-link");
                list.forEach(item => {
                    item.removeAttribute("tabindex");
                });
            }
        });

        // Generate the slug for the article based on the title
        // This removes special characters and replaces spaces with hyphens
        const generateSlug = (title) => {
            return title.replace(/\s+/g, '-').toLowerCase().replace(/[^a-zA-Z0-9-_]/g, "");
        };

        return (
            <div id="div-homecard-article-card">
                {currentItems.map((article, i) => (
                    <div key={i}>
                        <HomeCardContent
                            key={i}
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

    return (
        <div id="div-homecard-card">
            <div id="div-homecard-stitch">
                <div id="div-homecard-title">
                    <h1 id="h1-homecard-title" className="section-title">{props.title}</h1>
                </div>
                <div id="div-stitchBottom"></div>
                <PaginatedItems itemsPerPage={3} />
            </div>
        </div>
    );
}

export default HomeCard;