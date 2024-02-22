import React, {useCallback, useEffect, useRef, useState} from "react";
import {AiOutlineSearch} from 'react-icons/ai';
import {useDispatch, useSelector} from "react-redux";
import {searchRoom, searchValue} from "../../redux/actions/room";

function Header() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(searchValue(search));
    }, [dispatch, search]);

    return (
        <>
            <header className="header">
                <div className="search-block">
                    <div className="header-desc">
                        <h5>A web-based chat application that allows users to engage in real-time conversations</h5>
                    </div>
                    <div className="search-box">
                        <AiOutlineSearch className="search-icon"/>
                        <input value={search} onChange={(ev) => setSearch(ev.target.value)} type="text"
                               placeholder="Search room"/>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
