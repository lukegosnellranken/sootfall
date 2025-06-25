import { useNavigate } from 'react-router-dom';
import './AuthorCard.scss';

function AuthorCard(props) {
    
    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path);
    };

    // Only navigate to author page if on authors page
    return (
        <div id="div-authorcard" onClick={props.pageType === "authors" ? () => handleNavigation(`/authors/${props.authorName.toLowerCase()}`) : undefined}>
            <div id="div-authorcard-stitch">
                <div id='div-authorcard-content'>
                    <div id="div-authorcard-image">
                        <img id="img-authorcard" src={props.authorImage} alt="author"/>
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