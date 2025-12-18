// We import the React library to build the component.
import React from "react";
// We import the Next.js 'Link' component for handling fast, client-side navigation.
import Link from "next/link";
// We import the specific styles for this navigation item.
import './NavItem.scss';

// This is the 'NavItem' component. It represents a single, clickable item in the navigation bar.
// Its clever part is that it can intelligently render either a normal link (for external sites)
// or a special Next.js Link (for internal pages).
function NavItem(props) {
    // We check if the 'href' prop starts with 'http'. This is a simple way to determine
    // if the link goes to an external website (like "https://google.com") or an internal page (like "/articles").
    const isExternal = props.href && props.href.startsWith('http');

    // It returns a list item '<li>' containing the appropriate link.
    return (
        <li className="li-nav-item">
            {/* Here we use a ternary operator to conditionally render the link. */}
            {isExternal ? (
                // If the link is external, we render a standard HTML '<a>' tag.
                // 'target="_blank"' tells the browser to open the link in a new tab.
                // 'rel="noopener noreferrer"' is a security measure for external links.
                <a href={props.href} target="_blank" rel="noopener noreferrer">{props.name}</a>
            ) : (
                // If the link is internal, we use the special 'Link' component from Next.js.
                // This allows for faster page transitions without a full page reload.
                // We add a preceding slash '/' to the href to ensure it's a root-relative path.
                <Link href={props.href === '#' ? '#' : `/${props.href}`}>{props.name}</Link>
            )}
        </li>
    )
}

// We export the NavItem component so it can be used by the 'Nav' component.
export default NavItem;