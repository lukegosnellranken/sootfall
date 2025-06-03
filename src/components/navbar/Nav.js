import React, { useState } from "react";
import './Nav.css';
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";
 
function Nav() {
    const [search, setSearch] = useState("");
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
            </nav>
        </div>
    );
}

export default Nav;