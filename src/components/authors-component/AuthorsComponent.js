"use client";

import React from "react";
import { useState, useEffect } from "react";
import './AuthorsComponent.scss';
import AuthorCard from "../author-card/AuthorCard";
import { backendLink, token } from "../../config/api.ts";

function AuthorsComponent() {
    let [authorArray, setAuthorArray] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            // Get all authors' data
            await fetch(`${backendLink}/api/authors?populate=*`, {headers: {'Authorization': `Bearer ${token}`}})
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
                // Iterate through all author data
                for (let i = 0; i < data.length; i++) { 
                    let name = data[i].name;
                    let image = data[i].image;
                    let description = data[i].description;
                    iArray.push({name, image, description}); 
                }
                // Set state variable to iArray (now containing an array for each author)
                setAuthorArray(iArray);
            })
            .catch(error => {console.log(error)});
        }
        // Immediately run fetchData at mount
        fetchData();
    }, []);
    
    return(
        <div id="authorscomponent-container">
            <div id="div-authorscomponent-card">
                {
                    authorArray.map((author, id) => ( 
                        <AuthorCard 
                            key={author.name + id}
                            authorName={author.name}
                            authorImage={author.image}
                            authorDescription={author.description}
                            pageType="authors"
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default AuthorsComponent;