import React, {useEffect} from "react";
import avatar from "../../assets/image/back.jpg"
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/actions/chat";

function UsersList() {
    const dispatch = useDispatch();
    const roomData = useSelector((store) => store.chat.roomData);
    const usersData = useSelector((store) => store.chat.usersData);
    // const roomStatus = useSelector((store) => store.chat.roomStatus);

    useEffect(() => {
        if (roomData.accessIds.length !== 0) dispatch(getUsers(roomData.accessIds));
    }, [dispatch, roomData.accessIds]);

    return (
        <>
            {roomData.accessIds.length !== 0 ? usersData.map((item) => (
                <div key={item._id} className="chat-card">
                    <img className="chat-avatar" src={item.image} alt="no img"/>
                    <h3 className="user-name">{item.handle}</h3>
                </div>
            )) : null}
        </>
    );
}

export default UsersList;
