import React, {useCallback, useEffect, useState} from "react";
import Modal from "react-modal";
import {FaLock, FaUser} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {createRoom} from "../../redux/actions/room";
import {toast} from "react-toastify";

function AddRoom({addRoom, setAddRoom}) {
    const dispatch = useDispatch();
    const [stateRoom, setStateRoom] = useState(false);
    const [isCreateRoom, setCreateRoom] = useState({name: "", password: ""});

    const message = useSelector((store) => store.room.createRoomMessage);
    const status = useSelector((store) => store.room.createRoomStatus);

    useEffect(() => {
        if (status === 'fail' && message && message.length > 0) {
            message.forEach((error) => {
                Object.entries(error).forEach(([key, errorMessage]) => {
                    toast.error(errorMessage, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                });
            });
        }
        if (status === 'success') {
            toast.success("Room creation succeeded, pleas refresh page", {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            setAddRoom(false);
        }
    }, [status, message]);

    const handleSubmit = useCallback((ev) => {
        ev.preventDefault();
        dispatch(createRoom(isCreateRoom));
    }, [isCreateRoom]);

    const handleCreateRoom = useCallback((key, value) => {
        setCreateRoom((prevCreateRoom) => ({
            ...prevCreateRoom,
            [key]: value,
        }));
    }, []);

    return (
        <>
            <Modal
                isOpen={addRoom}
                onRequestClose={() => setAddRoom(!addRoom)}
                style={roomModal}
            >
                <form className="sign-in-form" onSubmit={(ev) => handleSubmit(ev)}>
                    <h2 className="title">Create Room</h2>
                    <div className="input-field">
                        <FaUser className="input-icons"/>
                        <input required onChange={(ev) => handleCreateRoom("name", ev.target.value)} type="text"
                               placeholder="Room Name"/>
                    </div>
                    <div className="input-field">
                        <FaLock className="input-icons"/>
                        <input required onChange={(ev) => handleCreateRoom("password", ev.target.value)} type="password"
                               placeholder="Password" disabled={stateRoom}/>
                    </div>
                    <div className="checkbox-modal">
                        <input type="checkbox" checked={stateRoom} onChange={() => setStateRoom(!stateRoom)}
                               id="myCheckbox"/>
                        <label htmlFor="myCheckbox"><p>Create public room</p></label>
                    </div>
                    <input type="submit" value="Create" className="btn solid"/>
                </form>
            </Modal>
        </>
    );
}

const roomModal = {
    content: {
        width: "90%",
        maxWidth: 500,
        height: 400,
        margin: "0 auto",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: "translate(-50%, -50%)",
        border: "1px solid #e6e6e6",
        backgroundColor: "#fafcfe",
        padding: "60px 0 0 0",
    },
};

export default AddRoom;
