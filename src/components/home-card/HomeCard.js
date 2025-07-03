import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './HomeCard.scss';
import HomeCardContent from "../home-card-content/HomeCardContent";
import ReactPaginate from 'react-paginate';

function HomeCard(props) {
    let [initDataArray, setInitDataArray] = useState([]);
    const paginationRef = useRef(null);
    const API_URL = process.env.REACT_APP_API_URL; // Get domain from .env
    const token = 'ff75d12ddbfa3b18817eacba0f70b6fc3ef76c0d2e13da25468bfa16a6deaffd1f071ccc5ef1cff42ce2d2618ec6f457da47f6eceede245b00c59711b268482613864751271af51baf71109535b1bb87eff397e4193ffef7d08300aaa4e685792c019da43d928a18fff82ed34920c0aabfbdfc0fa2b22bd7379fb264eaebf0f4';

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${API_URL}/api/articles?populate=*`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('Articles res error');
                }
            })
            .then(data => {
                let iArray = [];
                for (let i = 0; i < data.data.length; i++) {
                    let title = data.data[i].title;
                    let dateString = data.data[i].date;
                    dateString = dateString.slice(5) + "-" + dateString.slice(2,4);
                    let image = API_URL + data.data[i].image.formats.medium.url;
                    let tags = data.data[i].tags;
                    let author = data.data[i].author.name;
                    if (tags != null) {
                        tags = tags.split(",").map(item => item.trim());
                    }
                    iArray.push([title, dateString, image, tags, author]);
                }
                // If homepage, display all articles from most to least recent
                if (props.pageType === "home") {
                    iArray.sort((a, b) => new Date(b[1]) - new Date(a[1]));
                }
                // If tag page, display only articles that contain the specified tag from most to least recent
                else if (props.pageType === "tag") {
                    iArray = iArray.filter(arr => arr[3] && arr[3].includes(props.tag));
                    iArray.sort((a, b) => new Date(b[1]) - new Date(a[1]));
                }
                // If author page, display only articles written by the specified author from most to least recent
                else if (props.pageType === "author") {
                    iArray = iArray.filter(arr => arr[4] && arr[4].toLowerCase() === props.author.toLowerCase());
                    iArray.sort((a, b) => new Date(b[1]) - new Date(a[1]));
                }
                // If search page, display only articles related to the search
                else if (props.pageType === "search") {
                    const search = props.search ? props.search.toLowerCase() : "";
                    iArray = iArray.filter(arr =>
                        (arr[0] && arr[0].toLowerCase().includes(search)) || // title
                        (arr[3] && arr[3].some(tag => tag.toLowerCase().includes(search))) || // tags
                        (arr[4] && arr[4].toLowerCase().includes(search)) // author
                    );
                }
                setInitDataArray(iArray);
            })
            .catch(error => {console.log(error)});
        }
        fetchData();
    }, [props.pageType, props.tag, props.author, props.search, API_URL]);
    
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

        return (
            <div id="div-homecard-article-card">      
                {currentItems.reverse().map((article, i) => (
                    <div key={i}>
                        <HomeCardContent
                            key = {i}
                            sub = {`/articles/${(currentItems[currentItems.length-(i+1)][0]).replace(/\s+/g, '-').toLowerCase()}`}
                            title = {currentItems[currentItems.length-(i+1)][0]}
                            date = {currentItems[currentItems.length-(i+1)][1]}
                            image = {currentItems[currentItems.length-(i+1)][2]}
                            tags = {currentItems[currentItems.length-(i+1)][3]}
                            author = {currentItems[currentItems.length-(i+1)][4]}
                        />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div id="div-homecard-card">
            <div id="div-homecard-stitch">
                {
                    props.pageType === "tag" || props.pageType === "author" ?
                    <div id="div-homecard-back-link">
                        <p id="p-homecard-back-link" onClick={() => navigate(-1)}>
                            Return
                        </p>
                    </div>
                    : null
                }
                <div id="div-homecard-title">
                    <h1 id="h1-homecard-title">{props.title}</h1>
                </div>
                <div id="div-stitchBottom"></div>
                <PaginatedItems itemsPerPage={5} />
            </div>
        </div>
    );
}

export default HomeCard;