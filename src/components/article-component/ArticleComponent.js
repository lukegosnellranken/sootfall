import ArticleCard from "../article-card/ArticleCard";
import ArticleSideCard from "../article-side-card/ArticleSideCard";
import './ArticleComponent.scss';

function ArticleComponent({ article }) {
    return(
        <div id="div-articlecomponent-full-article-container">
            <div id="div-articlecomponent-full-article">
                <ArticleCard article={article}/>
            </div>
            <div id="div-articlecomponent-full-article-side-card">
                <ArticleSideCard currentArticleTitle={article.title} />
            </div>
        </div>
    );
}

export default ArticleComponent;