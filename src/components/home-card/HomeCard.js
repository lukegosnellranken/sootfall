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
   
    // useEffect(() => {
    //     let fetchEndpoint;
    //     switch (props.pageType) {
    //         case "home":
    //             fetchEndpoint = backendLink + "/api/articles?populate=*&sort=date:desc";
    //             break;
    //         case "search":
    //             fetchEndpoint = backendLink + "/api/articles?populate=*";
    //             break;
    //         case "author":
    //             fetchEndpoint = backendLink + "/api/articles?filters[author][name][$eqi]=" + props.author + "&populate=*&sort=date:desc";
    //             break;
    //         case "tag":
    //             fetchEndpoint = backendLink + "/api/articles?filters[tags][$contains]=" + props.tag + "&populate=*&sort=date:desc";
    //             break;
    //         default:
    //             fetchEndpoint = backendLink + "/api/articles?populate=*&sort=date:desc";
    //             break;
    //     }
    //     const fetchData = async () => {
    //         await fetch(fetchEndpoint, {headers: {'Authorization': `Bearer ${token}`}})
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json()
    //             } else {
    //                 console.log('Articles res error');
    //             }
    //         })
    //         .then(data => {
    //             let iArray = [];
    //             for (let i = 0; i < data.data.length; i++) {
    //                 let title = data.data[i].title;
    //                 let dateString = data.data[i].date;
    //                 dateString = dateString.slice(5) + "-" + dateString.slice(2,4);
    //                 let image;
    //                 if (envName === 'local') {
    //                     // Does not contain the API URL, need to concatenate
    //                     image = backendLink + data.data[i].image.formats.medium.url;
    //                 }
    //                 else if (envName === 'cloud') {
    //                     // Already contains the API URL, no concatenation necessary
    //                     image = data.data[i].image.formats.medium.url;
    //                 }
    //                 let tags = data.data[i].tags;
    //                 let author = data.data[i].author.name;
    //                 if (tags != null) {
    //                     tags = tags.split(",").map(item => item.trim());
    //                 }
    //                 iArray.push([title, dateString, image, tags, author]);
    //             }
    //             // If homepage, display all articles from most to least recent
    //             if (props.pageType === "home") {
    //                 // No client-side sorting, display as fetched
    //             }
    //             // If tag page, display only articles that contain the specified tag
    //             else if (props.pageType === "tag") {
    //                 iArray = iArray.filter(arr => arr[3] && arr[3].includes(props.tag));
    //             }
    //             // If author page, display only articles written by the specified author
    //             else if (props.pageType === "author") {
    //                 iArray = iArray.filter(arr => arr[4] && arr[4].toLowerCase() === props.author.toLowerCase());
    //             }
    //             // If search page, display only articles related to the search
    //             else if (props.pageType === "search") {
    //                 const search = props.search ? props.search.toLowerCase() : "";
    //                 iArray = iArray.filter(arr =>
    //                     (arr[0] && arr[0].toLowerCase().includes(search)) || // title
    //                     (arr[3] && arr[3].some(tag => tag.toLowerCase().includes(search))) || // tags
    //                     (arr[4] && arr[4].toLowerCase().includes(search)) // author
    //                 );
    //             }
    //             setInitDataArray(iArray);
    //         })
    //         .catch(error => {console.log(error)});
    //     }
    //     fetchData();
    // }, [props.pageType, props.tag, props.author, props.search, backendLink, token]);

    useEffect(() => {
        console.log(props);
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