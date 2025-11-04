"use client";

import React from "react";
import { useState, useEffect } from "react";
import './AuthorComponent.scss';
import AuthorCard from "../author-card/AuthorCard";
import HomeCard from "../home-card/HomeCard";

function AuthorComponent({ author }) {
    return(
        <div id="authorscomponent-container">
            {console.log(author)}    
        </div>
    );
}

// function AuthorComponent() {
//     let pathname = window.location.pathname.split("/").pop();
//     pathname = decodeURIComponent(pathname);
//     let [authorArray, setAuthorArray] = useState([]);
    
//     // Get data from ~/.env, set API_URL and token
//     const env = process.env.NEXT_PUBLIC_ENV;
//     let API_URL;
//     let token;
//     if (env === 'local') {
//         API_URL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
//         token = process.env.NEXT_PUBLIC_API_TOKEN_LOCAL;
//     }
//     else if (env === 'cloud') {
//         API_URL = process.env.NEXT_PUBLIC_API_URL_CLOUD;
//         token = process.env.NEXT_PUBLIC_API_TOKEN_CLOUD;
//     }

//     // Used for capitalizing author name for both display and data comparison
//     function capitalizeWords(str) {
//         return str
//             .split(" ")
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(" ");
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             // Get all authors' data
//             await fetch(`${API_URL}/api/authors?populate=*`, {headers: {'Authorization': `Bearer ${token}`}})
//             .then(res => {
//                 if (res.ok) {
//                     return res.json()
//                 } else {
//                     console.log('Articles res error');
//                 }
//             })
//             .then(data => {
//                 // What is returned is a "data" object within another "data" object
//                 data = data.data;
//                 let iArray = [];
//                 // Only run code to push author data to iArray if the name matches
//                 for (let i = 0; i < data.length; i++) { 
//                     if (data[i].name === capitalizeWords(pathname)) {
//                         let name = data[i].name
//                         let image;
//                         if (env === 'local') {
//                             // Does not contain the API URL, need to concatenate
//                             image = API_URL + data[i].image.formats.small.url;
//                         }
//                         else if (env === 'cloud') {
//                             // Already contains the API URL, no concatenation necessary
//                             image = data[i].image.formats.small.url;
//                         }
//                         let description = data[i].description;
//                         iArray.push([name, image, description]);
//                     }
//                 }
//                 // Set state variable to iArray (now containing an array for each author)
//                 setAuthorArray(iArray);
//             })
//             .catch(error => {console.log(error)});
//         }
//         // Immediately run fetchData at mount
//         fetchData();
//     }, [pathname, API_URL, token, env]);
    
//     // Check for data in authorArray before attempting to render components
//     return(
        // <div id="authorscomponent-container">
        //     <div id="div-authorscomponent-card">
        //         {
        //             authorArray[0] && (
        //                 <AuthorCard 
        //                     authorName={authorArray[0][0]}
        //                     authorImage={authorArray[0][1]}
        //                     authorDescription={authorArray[0][2]}
        //                 />
        //             )
        //         }
        //     </div>
        //     {
        //         authorArray[0] && (
        //             <HomeCard
        //                 pageType="author"
        //                 title = {"Writings by " + authorArray[0][0]}
        //                 author={authorArray[0][0]} 
        //             />
        //         )
        //     }
        // </div>
//     )
// }

export default AuthorComponent;