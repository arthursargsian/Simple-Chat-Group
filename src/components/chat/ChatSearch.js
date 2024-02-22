import React, {useEffect, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {getUser} from "../../redux/actions/auth";

function ChatSearch() {
    const dispatch = useDispatch();
    const [searchUser, setSearchUser] = useState("");

    useEffect(() => {
        if (searchUser) dispatch(getUser(searchUser));
    }, [searchUser, dispatch]);

    return (
        <>
            <div className="chat-search">
                <AiOutlineSearch className="search-icon chat-icon"/>
                <input onChange={(ev) => setSearchUser(ev.target.value)} className="chat-input"
                       placeholder="Search Users" type="text"/>
            </div>
        </>
    );
}

export default ChatSearch;
