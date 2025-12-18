// Here, we are importing the necessary components that make up the article page.
// 'ArticleCard' is the main component that displays the article's content.
import ArticleCard from "../article-card/ArticleCard";
// 'ArticleSideCard' is the component that appears on the side, often showing related articles or other info.
import ArticleSideCard from "../article-side-card/ArticleSideCard";
// This line imports the specific styles for this ArticleComponent.
import './ArticleComponent.scss';

// This is the 'ArticleComponent' function. It acts as a container or a wrapper.
// Its main job is to structure the layout of an individual article page.
// It receives the 'article' data as a 'prop' from its parent component (ArticlePage).
function ArticleComponent({ article }) {
    // The component returns a JSX structure, which looks like HTML.
    return(
        // This is the main container for the entire article page layout.
        <div id="div-articlecomponent-full-article-container">
            {/* This div holds the main article content. */}
            <div id="div-articlecomponent-full-article">
                {/* We are rendering the 'ArticleCard' component here.
                    We pass the 'article' data down to it so it knows what to display. */}
                <ArticleCard article={article}/>
            </div>
            {/* This div holds the side card/panel. */}
            <div id="div-articlecomponent-full-article-side-card">
                {/* We are rendering the 'ArticleSideCard' component here.
                    We pass the 'title' of the current article to it. This helps the side card
                    know which article is currently being viewed, for example, to avoid showing
                    a link to the same article in a "related articles" list. */}
                <ArticleSideCard currentArticleTitle={article.title} />
            </div>
        </div>
    );
}

// We export the 'ArticleComponent' so it can be used by other files, like 'ArticlePage'.
export default ArticleComponent;