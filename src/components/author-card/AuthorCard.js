import './AuthorCard.scss';

function AuthorCard(props) {
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
    
    // Only navigate to author page if on authors page
    return (
        <div id="div-authorcard" 
            className={props.pageType === "authors" ? "pointer" : "default"}
            onClick={props.pageType === "authors" ? () => window.location.href = `/authors/${props.authorName.toLowerCase()}` : undefined}
        >
            <div id="div-authorcard-stitch">
                <div id='div-authorcard-content'>
                    <div id="div-authorcard-image">
                        {props.authorImage && <img id="img-authorcard" src={API_URL + props.authorImage.formats.small.url} alt="author" draggable="false"/>}
                    </div>
                    <div id="div-author-name-description">
                        <p id='p-authorcard-name'>{props.authorName}</p>
                        <p id='p-authorcard-description'>{props.authorDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthorCard;