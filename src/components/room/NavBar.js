import React, {useCallback, useState} from "react";
import {BiSolidMessageRoundedAdd, BiUserCircle} from 'react-icons/bi';
import {TbLogout} from 'react-icons/tb';
import AddRoom from "./AddRoom";
import {useDispatch} from "react-redux";
import {logOut} from "../../redux/actions/auth";
import Utils from "../../Utils";
import {useNavigate} from "react-router-dom";


function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [addRoom, setAddRoom] = useState(false);

    const handleLogOut = useCallback(async () => {
        await dispatch(logOut());
        if (!Utils.getToken()) navigate("/");
    }, [dispatch]);

    return (
        <>
            <header className="nav-bar">
                <div className="tools">
                    <BiSolidMessageRoundedAdd onClick={() => setAddRoom(!addRoom)} className="tools-icon"/>
                    <BiUserCircle className="tools-icon"/>
                    <TbLogout onClick={handleLogOut} className="tools-icon"/>
                </div>
            </header>
            <AddRoom addRoom={addRoom} setAddRoom={setAddRoom}/>
        </>
    );
}

export default NavBar;
