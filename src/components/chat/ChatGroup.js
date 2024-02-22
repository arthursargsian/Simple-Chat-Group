import React, {useEffect, useState} from "react";
import ChatSearch from "./ChatSearch";
import Group from "./Group";
import {FaRectangleList} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {usersList} from "../../redux/actions/chat";

function ChatGroup({roomName}) {
    const dispatch = useDispatch();
    const [usersListToggle, setUsersListToggle] = useState(true);
    const usersListState = useSelector((store) => store.chat.usersListState);

    useEffect(() => {
        dispatch(usersList(usersListToggle));
    }, [usersListToggle, dispatch]);

    return (
        <>
            <section className="chat-group">
                <div className="chat-header">
                    <span>
                        <h3>Group {roomName}</h3>
                        <h5>People, Group, Messages</h5>
                    </span>
                    <FaRectangleList onClick={() => setUsersListToggle(!usersListToggle)}/>
                </div>
                {/*<ChatSearch/>*/}
                <section className="users-list">
                    <Group/>
                </section>
            </section>
        </>
    );
}

export default ChatGroup;
