import React, {useCallback, useState} from "react";
import Modal from "react-modal";
import {FaLock, FaUser} from "react-icons/fa";
import {verifyAccount} from "../../redux/actions/room";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function PrivateModal({routRoom, setRoutRoom, roomName, id}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [roomPassword, setRoomPassword] = useState("");
    const verifyAnswer = useSelector((store) => store.room.verifyAnswer);

    const handleSubmit = useCallback((ev) => {
        ev.preventDefault();
        dispatch(verifyAccount({roomName, roomPassword}));
        if (verifyAnswer) navigate(`/chat/${id}`);
    }, [roomPassword, roomName, dispatch, id, verifyAnswer, navigate]);

    return (
        <>
            <Modal
                isOpen={routRoom}
                onRequestClose={() => setRoutRoom(!routRoom)}
                style={roomModal}
            >
                <form className="sign-in-form" onSubmit={(ev) => handleSubmit(ev)}>
                    <h2 className="private-title">Connection the private room</h2>
                    <div className="input-field">
                        <FaLock className="input-icons"/>
                        <input required onChange={(ev) => setRoomPassword(ev.target.value)} type="password"
                               placeholder="Password"/>
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
export default PrivateModal;
