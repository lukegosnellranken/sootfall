// This file creates the main authors listing page for the blog.
// It serves as a central hub to display all authors associated with the articles.

// We're importing necessary components here.
import AuthorsComponent from "../../components/authors-component/AuthorsComponent.js";

// This is the main functional component for the authors page.
// It's a straightforward component that renders the 'AuthorsComponent'.
// The actual logic for fetching and displaying authors is encapsulated within 'AuthorsComponent' itself.
function Authors() {
    return (
        <div id="div-authors-component">
            <AuthorsComponent />
        </div>
    )
}

// We export the 'Authors' component as the default export for this page.
export default Authors;