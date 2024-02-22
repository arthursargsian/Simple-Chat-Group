import React, {useEffect, useState} from "react";
import avatar from "../../assets/image/back.jpg";
import {AiFillHome} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {FaRectangleList} from "react-icons/fa6";
import {useDispatch} from "react-redux";
import {usersList} from "../../redux/actions/chat";

function ChatHeader({user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [usersListToggle, setUsersListToggle] = useState(false);

    useEffect(() => {
        dispatch(usersList(usersListToggle));
    }, [usersListToggle, dispatch]);

    return (<>
        <header className="area-header">
            <div className="chat-card-admin">
                <img className="chat-avatar-admin" src={user?.image} alt=""/>
                <h3 className="user-name"> Room Admin: {user?.username}</h3>
            </div>
            <span className="header-icons">
                <AiFillHome onClick={() => navigate("/discover")}/>
                <FaRectangleList onClick={() => setUsersListToggle(!usersListToggle)}/>
            </span>
        </header>
    </>);
}

export default ChatHeader;
