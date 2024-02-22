import React from "react";
import {FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter} from "react-icons/fa";

function SocialMedia() {
    return (
        <>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
                <a href="#" className="social-icon">
                    <FaFacebookF/>
                </a>
                <a href="#" className="social-icon">
                    <FaTwitter/>
                </a>
                <a href="#" className="social-icon">
                    <FaGoogle/>
                </a>
                <a href="#" className="social-icon">
                    <FaLinkedinIn/>
                </a>
            </div>
        </>
    );
}

export default SocialMedia;
