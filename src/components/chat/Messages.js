import React, {useEffect, useState} from "react";
import io from "socket.io-client";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMessages} from "../../redux/actions/chat";
import Utils from "../../Utils";

const socketInstance = io("http://localhost:4000");

function Messages() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const storedMessages = useSelector((store) => store.chat.messages);

    const [combinedMessages, setCombinedMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    if (!socketInstance) return;

    useEffect(() => {
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Connected to Socket.IO");
        });

        socketInstance.on("receivedNewMessage", (newMessage) => {
            setCombinedMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [id]);

    useEffect(() => {
        dispatch(getMessages(id));
    }, [id, dispatch]);

    useEffect(() => {
        setCombinedMessages([...storedMessages]);
    }, [storedMessages]);

    return (
        <>
            {combinedMessages.map((item) => (
                <div
                    key={item._id}
                    className={
                        item.user._id === Utils.getUser()._id
                            ? "own-block"
                            : "message-block"
                    }
                >
                    <div className="message-ul">
                        <div className="message-card">
                            <img
                                src={item.user.image}
                                className="chat-avatar message-avatar"
                                alt=""
                            />
                            <h3 className="user-name-messgae">{item.user.username}</h3>
                        </div>
                        <div className="message-box">
                            <h6 className="message">{item.content}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Messages;
