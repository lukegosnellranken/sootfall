import React from "react";
import Link from "next/link";
import './NavItem.scss';

function NavItem(props) {
    return (
        <li className="li-nav-item">
            <Link href={`/${props.href}`}>{props.name}</Link>
        </li>
    )
}

export default NavItem;