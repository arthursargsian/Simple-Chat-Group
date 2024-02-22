import React, {useEffect} from "react";
import ChatGroup from "../../components/chat/ChatGroup";
import ChatHeader from "../../components/chat/ChatHeader";
import MessagesArea from "../../components/chat/MessagesArea";
import MessageInput from "../../components/chat/MessageInput";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, room} from "../../redux/actions/chat";
import {useParams} from "react-router-dom";

function Chat() {
    const {id} = useParams();
    const dispatch = useDispatch();

    const usersListState = useSelector((store) => store.chat.usersListState);
    const roomData = useSelector((store) => store.chat.roomData);
    const roomStatus = useSelector((store) => store.chat.roomStatus);

    useEffect(() => {
        dispatch(room(id));
    }, [dispatch, id]);

    return (
        <div className="wrapper">
            <div className="chat-document">
                {usersListState ? <ChatGroup roomName={roomData?.name}/> : null}
                <div className="chat-block">
                    <ChatHeader user={roomData.user}/>
                    <MessagesArea/>
                    <MessageInput/>
                </div>
            </div>
        </div>
    );
}

export default Chat;
