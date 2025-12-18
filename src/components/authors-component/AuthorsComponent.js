// This line marks this as a Client Component, which is necessary because it uses React hooks
// like 'useState' and 'useEffect' to fetch and manage its own data directly in the browser.
"use client";

// We're importing the necessary tools and components.
import React from "react";
// 'useState' is for managing the component's internal data (the list of authors).
// 'useEffect' is for performing actions after the component has rendered, like fetching data.
import { useState, useEffect } from "react";
// We import the specific styles for this component.
import './AuthorsComponent.scss';
// 'AuthorCard' is the reusable component we'll use to display each author.
import AuthorCard from "../author-card/AuthorCard";
// We import the backend URL and authentication token from our configuration file.
import { backendLink, token } from "../../config/api.ts";

// This is the 'AuthorsComponent'. Its sole purpose is to fetch a list of all authors
// from the backend and display them on the page.
function AuthorsComponent() {
    // We use 'useState' to create a state variable 'authorArray' to hold our list of authors.
    // It starts as an empty array '[]'.
    let [authorArray, setAuthorArray] = useState([]);
    
    // 'useEffect' runs the code inside it after the component has been rendered to the screen.
    // By providing an empty dependency array '[]' at the end, we ensure this code runs only once.
    useEffect(() => {
        // We define an 'async' function to handle the process of fetching data from the backend.
        const fetchData = async () => {
            // We use 'fetch' to make a request to our backend API to get all authors.
            // 'populate=*' tells the backend to include all related data, like images.
            // We provide our authentication 'token' in the headers to get permission.
            await fetch(`${backendLink}/api/authors?populate=*`, {headers: {'Authorization': `Bearer ${token}`}})
            // After the request is complete, we get a response.
            .then(res => {
                // We check if the response was successful ('ok').
                if (res.ok) {
                    // If it's ok, we convert the response to JSON format.
                    return res.json()
                } else {
                    // If there was an error, we log it to the console.
                    console.log('Authors response error');
                }
            })
            // The '.then()' block runs if the previous one was successful.
            .then(data => {
                // The Strapi API often wraps the array of items in a 'data' object, so we extract it.
                data = data.data;
                // We create a temporary array to hold the formatted author data.
                let iArray = [];
                // We loop through each author returned from the API.
                for (let i = 0; i < data.length; i++) { 
                    // We extract the name, image, and description for each author.
                    let name = data[i].name;
                    let image = data[i].image;
                    let description = data[i].description;
                    // We push a new, cleaner object with this data into our temporary array.
                    iArray.push({name, image, description}); 
                }
                // Finally, we update the component's state with the array of formatted author data.
                // This will cause the component to re-render and display the authors.
                setAuthorArray(iArray);
            })
            // If any part of the process fails, the '.catch()' block will run and log the error.
            .catch(error => {console.log(error)});
        }
        // We call the 'fetchData' function to start the data fetching process as soon as the component mounts.
        fetchData();
    }, []); // The empty array '[]' means this effect does not depend on any props or state, so it only runs once.
    
    // This is the JSX that defines what the component will render.
    return(
        // This is the main container for the list of authors.
        <div id="authorscomponent-container">
            <div id="div-authorscomponent-card">
                {
                    // We 'map' over the 'authorArray' that we stored in our state.
                    // For each 'author' in the array, we will render an 'AuthorCard' component.
                    authorArray.map((author, id) => ( 
                        <AuthorCard 
                            // 'key' is a special prop that React needs for lists to keep track of each item efficiently.
                            key={author.name + id}
                            // We pass the author's details down to the 'AuthorCard' component as props.
                            authorName={author.name}
                            authorImage={author.image}
                            authorDescription={author.description}
                            // We set 'pageType' to "authors" to let the AuthorCard know it should be clickable.
                            pageType="authors"
                        />
                    ))
                }
            </div>
        </div>
    )
}

// We export the AuthorsComponent so it can be used on the main authors page.
export default AuthorsComponent;