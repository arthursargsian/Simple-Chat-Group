import React, {useCallback, useState} from "react";
import {IoSend} from "react-icons/io5";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {sendMessages} from "../../redux/actions/chat";

function MessageInput() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [content, setContant] = useState("");

    const handleSendMessage = useCallback(() => {
        dispatch(sendMessages({content, roomId: id}));
        setContant("");
    }, [content, dispatch, id]);

    return (
        <>
            <div className="under-input"></div>
            <div className="message-input">
                <textarea value={content} placeholder="Type Message" onChange={(ev) => setContant(ev.target.value)}/>
                <IoSend onClick={handleSendMessage}/>
            </div>
        </>
    );
}

export default MessageInput;
