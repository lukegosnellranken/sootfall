import React from "react";
import './TagComponent.scss';
import { useParams } from "react-router-dom";
import HomeCard from "../home-card/HomeCard";

// function TagComponent() {
//     let pathname = window.location.pathname.split("/").pop();
//     pathname = decodeURIComponent(pathname);
//     // Using useParams is necessary for causing the page to rerender
//     // when clicking a new tag when the user is already on the same route
//     const { tagName } = useParams();

//     return(
//         <div id="tagcomponent-container">
//             <div id="div-tagcomponent-card">
//                 <HomeCard
//                     title = {"Tag: " + pathname}
//                     pageType = "tag"
//                     tag = {tagName}
//                 />
//             </div>
//         </div>
//     )
// }

function TagComponent({ tagName, articles }) {
    console.log("hello");
    // return (
    //     <div>
    //         <h1>{tagName}</h1>
    //         {articles.map((article) => (
    //             <div key={article.id}>
    //                 <h2>{article.title}</h2>
    //                 <p>{article.description}</p>
    //             </div>
    //         ))}
    //     </div>
    // );
    return(
        <div id="tagcomponent-container">
            <div id="div-tagcomponent-card">
                <HomeCard
                    title = {"Tag: " + tagName}
                    pageType = "tag"
                    tag = {tagName}
                    articles = {articles}
                />
            </div>
        </div>
    )
}

export default TagComponent;