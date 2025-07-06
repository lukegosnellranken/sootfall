import React, { useState } from "react";
import './Nav.scss';
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";
 
function Nav() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search/${encodeURIComponent(search.trim())}`);
            setSearch("");
        }
    }

    return(
        <div id="div-nav-container">
            <nav id="nav-nav">
                <div id="div-nav-list">
                    <ul id="ul-nav-list">
                        <NavItem name="Home" href="#"/>
                        <NavItem name="Authors" href="authors"/>
                        <NavItem name="Tags" href="tags"/>
                        <NavItem name="Donate" href="#"/>
                    </ul>
                    <form id="form-search" onSubmit={handleSearch}>
                        <input
                            id="input-search"
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </form>
                </div>
                <div id="nav-list-mobile">
                    <div id="div-mobile-hamburger-search">
                        <button
                            id="btn-hamburger"
                            className={menuOpen ? "open" : ""}
                            aria-label="Open menu"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <div id="div-hamburger">
                                <span className={menuOpen ? "open" : ""} style={{display: "block", width: "25px", height: "3px", margin: "5px 0"}}></span>
                                <span className={menuOpen ? "open" : ""} style={{display: "block", width: "25px", height: "3px", margin: "5px 0"}}></span>
                                <span className={menuOpen ? "open" : ""} style={{display: "block", width: "25px", height: "3px", margin: "5px 0"}}></span>
                            </div>
                        </button>
                        <form id="form-search-mobile" onSubmit={handleSearch}>
                            <input
                                id="input-search-mobile"
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </form>
                    </div>
                    <ul id="ul-nav-list-mobile" className={menuOpen ? "open" : ""}>
                        <NavItem name="Home" href="#"/>
                        <NavItem name="Authors" href="authors"/>
                        <NavItem name="Tags" href="tags"/>
                        <NavItem name="Donate" href="#"/>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Nav;