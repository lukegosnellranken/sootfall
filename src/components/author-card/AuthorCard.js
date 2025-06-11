// import { useLocation } from "react-router-dom";
import './AuthorCard.css';
import { useState, useEffect } from "react";

function AuthorCard() {
    // Remove unicode data from pathname
    const pathname = decodeURIComponent(window.location.pathname);
    // Remove the last forward-slash and everything behind it
    const authorName = pathname.substring(pathname.lastIndexOf('/') + 1);
    // Set the token for accessing the Strapi API
    const token = 'ff75d12ddbfa3b18817eacba0f70b6fc3ef76c0d2e13da25468bfa16a6deaffd1f071ccc5ef1cff42ce2d2618ec6f457da47f6eceede245b00c59711b268482613864751271af51baf71109535b1bb87eff397e4193ffef7d08300aaa4e685792c019da43d928a18fff82ed34920c0aabfbdfc0fa2b22bd7379fb264eaebf0f4';
    let [authorArray, setAuthorArray] = useState([]);
    let authorImage = authorArray[0]?.[0];
    let authorDescription = authorArray[0]?.[1];

    // Used for capitalizing author name for both display and data comparison
    function capitalizeWords(str) {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    useEffect(() => {
        const fetchData = async () => {
            // Get all authors' data
            await fetch('http://localhost:1337/api/authors?populate=*', {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                if (res.ok) {
                    console.log(res);
                    return res.json()
                } else {
                    console.log('Articles res error');
                }
            })
            .then(data => {
                // What is returned is a "data" object within another "data" object
                data = data.data;
                let iArray = [];
                // Iterate through all author data
                for (let i = 0; i < data.length; i++) {
                    // Only run code to push author data to iArray if the name matches
                    if (data[i].name === capitalizeWords(authorName)) {
                        let image = 'http://localhost:1337' + data[i].image.formats.thumbnail.url;
                        let description = data[i].description;
                        iArray.push([image, description]);
                    }
                }
                // Set state variable to iArray
                setAuthorArray(iArray);
            })
            .catch(error => {console.log(error)});
        }
        // Immediately run fetchData at mount
        fetchData();
    }, [authorName]);

    return (
        <div id="div-authorcard">
            <div id="div-authorcard-stitch">
                <div id='div-authorcard-content'>
                    <div id="div-authorcard-image">
                        <img id="img-authorcard" src={authorImage} alt="author"/>
                    </div>
                    <div id="div-author-name-description">
                        <p id='p-authorcard-name'>{capitalizeWords(authorName)}</p>
                        <p id='p-authorcard-description'>{authorDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthorCard;