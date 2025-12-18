// We import the specific styles for this AuthorCard component.
import './AuthorCard.scss';

// This is the 'AuthorCard' component. It's designed to be a reusable card
// that displays information about a single author, including their picture, name, and description.
// It receives all the necessary author data and configuration through 'props'.
function AuthorCard(props) {
    // This section reads environment variables to determine the correct base URL for images.
    // This is a common pattern to handle differences between a local development environment and a live "cloud" server.
    const env = process.env.NEXT_PUBLIC_ENV;
    let API_URL;
    let token; // Although 'token' is set here, it is not used in this component.
    if (env === 'local') {
        // For 'local' development, we need to prepend the local API server's URL to the image path.
        API_URL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
        token = process.env.NEXT_PUBLIC_API_TOKEN_LOCAL;
    }
    else if (env === 'cloud') {
        // For the 'cloud' environment, the image URL provided by the backend is already a complete, absolute URL.
        // Therefore, we set API_URL to an empty string so nothing gets prepended.
        API_URL = '';
        token = process.env.NEXT_PUBLIC_API_TOKEN_CLOUD;
    }
    
    // The component returns JSX, which defines its structure and behavior.
    return (
        // This is the main container for the author card.
        // It has a dynamic 'className' and an 'onClick' handler.
        <div id="div-authorcard" 
            // The 'className' changes based on the 'pageType' prop.
            // If it's on the main "authors" listing page, we add the 'pointer' class to make the cursor a hand, indicating it's clickable.
            // Otherwise, we use a 'default' class.
            className={props.pageType === "authors" ? "pointer" : "default"}
            // The 'onClick' handler is also conditional.
            // If the 'pageType' is "authors", clicking the card will navigate the user to that specific author's page.
            // 'window.location.href' is used for a full page navigation.
            // If it's not the "authors" page, 'onClick' is set to 'undefined', so nothing happens.
            onClick={props.pageType === "authors" ? () => window.location.href = `/authors/${props.authorName.toLowerCase()}` : undefined}
        >
            <div id="div-authorcard-stitch">
                <div id='div-authorcard-content'>
                    {/* This div holds the author's profile picture. */}
                    <div id="div-authorcard-image">
                        {/* We only try to display an image if the 'authorImage' prop exists.
                            The 'src' is constructed by combining the API_URL (which might be empty) with the image path from the props. */}
                        {props.authorImage && <img id="img-authorcard" src={API_URL + props.authorImage.formats.small.url} alt="author" draggable="false"/>}
                    </div>
                    {/* This div holds the author's name and description. */}
                    <div id="div-author-name-description">
                        {/* The author's name is displayed here, taken from the 'authorName' prop. */}
                        <p id='p-authorcard-name'>{props.authorName}</p>
                        {/* The author's description is displayed here, taken from the 'authorDescription' prop. */}
                        <p id='p-authorcard-description'>{props.authorDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// We export the AuthorCard component so it can be used in other files.
export default AuthorCard;