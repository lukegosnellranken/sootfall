import React from "react";
import Link from "next/link";
import './NavItem.scss';

function NavItem(props) {
    const isExternal = props.href && props.href.startsWith('http');

    return (
        <li className="li-nav-item">
            {isExternal ? (
                <a href={props.href} target="_blank" rel="noopener noreferrer">{props.name}</a>
            ) : (
                <Link href={props.href === '#' ? '#' : `/${props.href}`}>{props.name}</Link>
            )}
        </li>
    )
}

export default NavItem;