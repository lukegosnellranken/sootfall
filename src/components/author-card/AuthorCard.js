import { useNavigate } from 'react-router-dom';
import './AuthorCard.css';

function AuthorCard(props) {
    
    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div id="div-authorcard" onClick={() => handleNavigation(`/authors/${props.authorName.toLowerCase()}`)}>
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