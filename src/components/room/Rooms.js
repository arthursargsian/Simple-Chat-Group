import React, {useCallback, useState} from "react";
import moment from "moment";
import Button from "../common/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {room} from "../../redux/actions/chat";
import {roomData, verifyAccount} from "../../redux/actions/room";
import PrivateModal from "../../components/room/PrivateModal";
import Utils from "../../Utils";

function Rooms({rooms}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [routRoom, setRoutRoom] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [id, setId] = useState("");

    const roomAccess = useSelector((store) => store.room.roomData.access || false);
    const verifyAnswer = useSelector((store) => store.room.verifyAnswer);

    const handleNavigateRoom = useCallback((id, roomName, access, accessIds) => {
        setRoomName(roomName);
        setId(id);
        if (access) {
            dispatch(verifyAccount({roomName}));
            navigate(`/chat/${id}`);
        }
        if (!access) {
            for (let i = 0; i < accessIds.length; i++) {
                if (accessIds[i] === Utils.getUser()._id) {
                    dispatch(verifyAccount({roomName}));
                    navigate(`/chat/${id}`);
                } else {
                    setRoutRoom(!routRoom);
                }
            }
        }
    }, [dispatch, verifyAnswer, roomAccess]);

    if (!Array.isArray(rooms)) return window.location.reload();
    return (<>
        <div className="container">
            <PrivateModal routRoom={routRoom} setRoutRoom={setRoutRoom} roomName={roomName} id={id}/>
            <div className="room-block">
                {rooms?.map((item) => (<div key={item._id} className="room-card">
                    <h6 className="room-name">{item.name}</h6>
                    {item.access ?
                        <div className="public-room room"><h6 className="room-status">Public</h6><span></span>
                        </div> :
                        <div className="private-room room"><h6 className="room-status">Private</h6><span></span>
                        </div>}
                    <div className="client-box">
                        <h6 className="room-client">Users: {item.accessIds.length}</h6>
                        <h6 className="room-client">Admin: {item.user.handle}</h6>
                    </div>
                    <div className="card-below">
                        <h6 className="room-created">{moment(item.created_at).format("MMM Do YY")}</h6>
                        <Button onClick={() => handleNavigateRoom(item._id, item.name, item.access, item.accessIds)}
                                variant="room-open">Connection</Button>
                    </div>
                </div>))}
            </div>
        </div>
    </>);
}

export default Rooms;
