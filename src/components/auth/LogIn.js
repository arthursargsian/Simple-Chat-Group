import React, {useCallback, useEffect, useState} from "react";
import {FaUser, FaLock} from 'react-icons/fa';
import SocialMedia from "./SocialMedia";
import {useDispatch, useSelector} from "react-redux";
import {authLogIn} from "../../redux/actions/auth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Utils from "../../Utils";

function Login() {
    const dispatch = useDispatch();
    const naviagte = useNavigate();

    const [remember, setRemember] = useState(false);
    const [complateForm, setComplateForm] = useState({email: "", password: ""});

    const status = useSelector((store) => store.auth.signUpStatus);
    const message = useSelector((store) => store.auth.signUpMessage);

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
    }, [status, message]);

    const handleSubmitForm = useCallback(async (ev) => {
        ev.preventDefault();
        if (complateForm.email && complateForm.password) await dispatch(authLogIn({complateForm, remember}));
        if (Utils.getToken()) naviagte("/discover");
    }, [dispatch, complateForm, remember, naviagte]);

    const handleComplateForm = useCallback((key, value) => {
        setComplateForm((prevComplateForm) => ({
            ...prevComplateForm,
            [key]: value,
        }));
    }, [complateForm]);
    return (
        <>
            <form className="sign-in-form" onSubmit={(ev) => handleSubmitForm(ev)}>
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                    <FaUser className="input-icons"/>
                    <input onChange={(ev) => handleComplateForm("email", ev.target.value)} type="email"
                           placeholder="Email"/>
                </div>
                <div className="input-field">
                    <FaLock className="input-icons"/>
                    <input onChange={(ev) => handleComplateForm("password", ev.target.value)} type="password"
                           placeholder="Password"/>
                </div>
                <div className="checkbox-remember">
                    <input checked={remember} onChange={() => setRemember(!remember)} type="checkbox" id="myCheckbox"/>
                    <label htmlFor="myCheckbox"><p>Remember me?</p></label>
                </div>
                <input type="submit" value="Login" className="btn solid"/>
                <SocialMedia/>
            </form>
        </>
    );
}

export default Login;
