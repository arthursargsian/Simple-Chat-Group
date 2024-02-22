import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStateRooms} from "../../redux/actions/room";

function RoomBar() {
    const dispatch = useDispatch();
    const roomState = useSelector((store) => store.room.roomStatus);

    useEffect(() => {
        dispatch(getStateRooms())
    }, [dispatch]);

    return (<>
        <header className="room-bar">
            <h5>Privat {roomState.privateRoomsCount}</h5>
            <h5>Public {roomState.publicRoomsCount}</h5>
            <h5>Total {roomState.totalRooms}</h5>
        </header>
    </>);
}

export default RoomBar;
