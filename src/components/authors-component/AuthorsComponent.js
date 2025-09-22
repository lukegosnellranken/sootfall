import React from "react";
import { useState, useEffect } from "react";
import './AuthorsComponent.scss';
import AuthorCard from "../author-card/AuthorCard";

function AuthorsComponent() {
    let [authorArray, setAuthorArray] = useState([]);
    
    // Get data from ~/.env, set API_URL and token
    const env = process.env.NEXT_PUBLIC_ENV;
    let API_URL;
    let token;
    if (env === 'local') {
        API_URL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
        token = process.env.NEXT_PUBLIC_API_TOKEN_LOCAL;
    }
    else if (env === 'cloud') {
        API_URL = process.env.NEXT_PUBLIC_API_URL_CLOUD;
        token = process.env.NEXT_PUBLIC_API_TOKEN_CLOUD;
    }

    useEffect(() => {
        const fetchData = async () => {
            // Get all authors' data
            await fetch(`${API_URL}/api/authors?populate=*`, {headers: {'Authorization': `Bearer ${token}`}})
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
                    let image;
                    if (env === 'local') {
                        // Does not contain the API URL, need to concatenate
                        image = API_URL + data[i].image.formats.small.url;
                    }
                    else if (env === 'cloud') {
                        // Already contains the API URL, no concatenation necessary
                        image = data[i].image.formats.small.url;
                    }
                    let description = data[i].description;
                    iArray.push([name, image, description]); 
                }
                // Set state variable to iArray (now containing an array for each author)
                setAuthorArray(iArray);
            })
            .catch(error => {console.log(error)});
        }
        // Immediately run fetchData at mount
        fetchData();
    }, [API_URL, token, env]);
    
    return(
        <div id="authorscomponent-container">
            <div id="div-authorscomponent-card">
                {
                    authorArray.map(([name, image, description], id) => ( 
                        <AuthorCard 
                            key={name + id}
                            authorName={name}
                            authorImage={image}
                            authorDescription={description}
                            pageType="authors"
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default AuthorsComponent;