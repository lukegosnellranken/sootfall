import ArticleCard from "../article-card/ArticleCard";
import ArticleSideCard from "../article-side-card/ArticleSideCard";
import './ArticleComponent.css';

function ArticleComponent() {
    return(
        <div id="div-articlecomponent-full-article-container">
            <div id="div-articlecomponent-full-article">
                <ArticleCard/>
            </div>
            <div id="div-articlecomponent-full-article-side-card">
                <ArticleSideCard/>
            </div>
        </div>
    );
}

export default ArticleComponent;