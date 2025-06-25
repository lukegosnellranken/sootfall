import React from "react";
import { useState, useEffect } from "react";
import './AuthorComponent.scss';
import AuthorCard from "../author-card/AuthorCard";
import HomeCard from "../home-card/HomeCard";

function AuthorComponent() {
    let pathname = window.location.pathname.split("/").pop();
    pathname = decodeURIComponent(pathname);
    let [authorArray, setAuthorArray] = useState([]);
    // Set the token for accessing the Strapi API
    const token = 'ff75d12ddbfa3b18817eacba0f70b6fc3ef76c0d2e13da25468bfa16a6deaffd1f071ccc5ef1cff42ce2d2618ec6f457da47f6eceede245b00c59711b268482613864751271af51baf71109535b1bb87eff397e4193ffef7d08300aaa4e685792c019da43d928a18fff82ed34920c0aabfbdfc0fa2b22bd7379fb264eaebf0f4';

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
                    return res.json()
                } else {
                    console.log('Articles res error');
                }
            })
            .then(data => {
                // What is returned is a "data" object within another "data" object
                data = data.data;
                let iArray = [];
                // Only run code to push author data to iArray if the name matches
                for (let i = 0; i < data.length; i++) { 
                    if (data[i].name === capitalizeWords(pathname)) {
                        let name = data[i].name
                        let image = 'http://localhost:1337' + data[i].image.formats.thumbnail.url;
                        let description = data[i].description;
                        iArray.push([name, image, description]);
                    }
                }
                // Set state variable to iArray (now containing an array for each author)
                setAuthorArray(iArray);
            })
            .catch(error => {console.log(error)});
        }
        // Immediately run fetchData at mount
        fetchData();
    }, [pathname]);
    
    // Check for data in authorArray before attempting to render components
    return(
        <div id="authorscomponent-container">
            <div id="div-authorscomponent-card">
                {
                    authorArray[0] && (
                        <AuthorCard 
                            authorName={authorArray[0][0]}
                            authorImage={authorArray[0][1]}
                            authorDescription={authorArray[0][2]}
                        />
                    )
                }
            </div>
            {
                authorArray[0] && (
                    <HomeCard
                        pageType="author"
                        title = {"Writings by " + authorArray[0][0]}
                        author={authorArray[0][0]} 
                    />
                )
            }
        </div>
    )
}

export default AuthorComponent;