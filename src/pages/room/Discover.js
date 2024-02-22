import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createRoom, roomList, searchRoom} from "../../redux/actions/room";
import Loading from "../../components/common/Loading";
import Rooms from "../../components/room/Rooms";
import Header from "../../components/common/Header";
import RoomBar from "../../components/room/RoomBar";
import NavBar from "../../components/room/NavBar";
import Wrong from "../../components/common/Wrong";

function Discover() {
    const dispatch = useDispatch();
    const searchRef = useRef();
    const rooms = useSelector((store) => store.room.rooms);
    const roomsStatus = useSelector((store) => store.room.roomsStatus);
    const searchStatus = useSelector((store) => store.room.searchResultRoomStatus);
    const searchResultRoom = useSelector((store) => store.room.searchResultRoom);
    const searchState = useSelector((store) => store.room.searchState);

    useEffect(() => {
        if (searchState) {
            clearTimeout(searchRef.current);
            searchRef.current = setTimeout(() => {
                dispatch(searchRoom(searchState));
            }, 300);
        }
    }, [dispatch, searchState]);

    useEffect(() => {
        dispatch(roomList());
    }, [dispatch]);

    return (
        <div className="wrapper">
            <NavBar/>
            <Header/>
            {roomsStatus === "loading" ? <Loading/> : <RoomBar/>}

            {searchState && searchStatus === "success" ? (
                <Rooms rooms={searchResultRoom}/>
            ) : searchState && searchStatus === "fail" ? <Wrong/> : searchState && searchStatus === "loading" ?
                <Loading/> : null}

            {!searchState && roomsStatus === "success" ?
                <Rooms rooms={rooms}/> : !searchState && roomsStatus === "fail" ?
                    <Wrong/> : searchState && searchStatus === "loading" ?
                        <Loading/> : null}
        </div>
    );
}

export default Discover;

