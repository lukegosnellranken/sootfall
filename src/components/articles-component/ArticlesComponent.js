// We're importing the necessary tools and components from React.
import React from "react";
// We import the specific styles for this component.
import './ArticlesComponent.scss';
// 'HomeCard' is a more general component used for displaying lists of articles,
// and we are reusing it here to show all articles.
import HomeCard from "../home-card/HomeCard";

// This is the 'ArticlesComponent'. Its main purpose is to provide a container
// for displaying a list of articles, either all of them or a filtered list based on a search.
// It receives the list of articles and an optional search value as 'props'.
function ArticlesComponent(props) {
    // We set a default title for the page.
    let title = "All Writings";
    // We check if a 'searchValue' was passed in the props.
    // This would happen if the user came to this page from the search bar.
    if (props.searchValue) {
        // If there's a search value, we change the title to show what the user searched for.
        title = "Results for: " + props.searchValue;
    }
    // The component renders its structure using JSX.
    return (
        // This is the main container for the component.
        <div id="articlescomponent-container">
            {/* This div wraps the 'HomeCard' component. */}
            <div id="div-articlescomponent-card">
                {/* We are rendering the 'HomeCard' component here.
                    This shows how components can be reused in different parts of an application.
                    We pass several props to configure the 'HomeCard'. */}
                <HomeCard
                    // The 'title' we determined earlier is passed to the 'HomeCard'.
                    title = { title }
                    // 'pageType' can be used by 'HomeCard' to slightly change its appearance or behavior.
                    pageType = "home"
                    // We pass the list of 'articles' that this component received down to the 'HomeCard' to display.
                    articles = { props.articles }
                />
            </div>
        </div>
    )
}

// We export the component so it can be used in other parts of the site, like the main articles page.
export default ArticlesComponent;