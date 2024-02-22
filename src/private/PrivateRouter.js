import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Utils from "../Utils";

function PrivateRouter(props) {
    const navigate = useNavigate();
    const {children} = props;
    const token = Utils.getToken();

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [navigate, token]);

    return token ? children : null;
}

export default PrivateRouter;
