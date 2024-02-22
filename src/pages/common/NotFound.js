import React from "react";
import gif from "../../assets/image/404.gif";

function NotFound() {
    return (
        <div className="wrapper">
            <div className="not-found">
                <img src={gif} alt="not found"/>
            </div>
        </div>
    );
}

export default NotFound;
