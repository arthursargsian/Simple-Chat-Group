import React, {useCallback, useEffect, useState} from 'react';
import {FaUser, FaEnvelope, FaLock, FaPaste} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {authSignUp, authLogIn} from '../../redux/actions/auth';
import {ToastContainer, toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import SocialMedia from "./SocialMedia";
import Utils from "../../Utils";

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [complateForm, setComplateForm] = useState({
        handle: '', username: '', email: '', password: '',
    });

    const status = useSelector((store) => store.auth.signInStatus);
    const message = useSelector((store) => store.auth.signInMessage);

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
            setComplateForm({handle: '', username: '', email: '', password: ''});
        }
    }, [status, message]);

    const handleSubmitForm = useCallback(async (ev) => {
        ev.preventDefault();
        if (complateForm.email &&
            complateForm.password &&
            complateForm.handle &&
            complateForm.username) {
            await dispatch(authSignUp(complateForm));
        }
        if (Utils.getToken()) navigate("/discover");
    }, [dispatch, navigate, complateForm]);

    const handleComplateForm = useCallback((key, value) => {
        setComplateForm((prevComplateForm) => ({
            ...prevComplateForm, [key]: value,
        }));
    }, []);

    return (<form className="sign-up-form" onSubmit={(ev) => handleSubmitForm(ev)}>
        <h2 className="title">Sign up</h2>
        <div className="input-field">
            <FaPaste className="input-icons"/>
            <input value={complateForm.handle}
                   onChange={(ev) => handleComplateForm("handle", ev.target.value)}
                   type="text"
                   placeholder="Handle name"/>
        </div>
        <div className="input-field">
            <FaUser className="input-icons"/>
            <input value={complateForm.username}
                   onChange={(ev) => handleComplateForm("username", ev.target.value)}
                   type="text"
                   placeholder="User name"/>
        </div>
        <div className="input-field">
            <FaEnvelope className="input-icons"/>
            <input value={complateForm.email} onChange={(ev) => handleComplateForm("email", ev.target.value)}
                   type="email"
                   placeholder="Email"/>
        </div>
        <div className="input-field">
            <FaLock className="input-icons"/>
            <input value={complateForm.password}
                   onChange={(ev) => handleComplateForm("password", ev.target.value)}
                   type="password"
                   placeholder="Password"/>
        </div>
        <input type="submit" className="btn" value="Sign up"/>
        <SocialMedia/>
    </form>);
};

export default SignUp;
