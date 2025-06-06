import React from "react";
import './NavItem.css';
import { Link } from "react-router-dom";

function NavItem(props) {
    return (
        <li className="li-nav-item">
            <Link to={`/${props.href}`}>{props.name}</Link>
        </li>
    )
}

export default NavItem;