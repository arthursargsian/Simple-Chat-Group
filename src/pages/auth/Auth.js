import React, {useState} from "react";
import {Helmet} from "react-helmet";
import Signup from "../../components/auth/Signup";
import LogIn from "../../components/auth/LogIn";
import Button from "../../components/common/Button";

function Auth() {
    const [authBtn, setAuthBtn] = useState(false);
    return (
        <div className="wrapper">
            <div className={`container-animation ${authBtn ? "sign-up-mode" : ""}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <LogIn/>
                        <Signup/>
                    </div>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Engage in Real-Time Conversations
                            </p>
                            <Button onClick={() => setAuthBtn(!authBtn)} variant={"btn transparent"}>
                                Sign up
                            </Button>
                        </div>
                        <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt=""/>
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Welcome to Connect and Chat
                            </p>
                            <Button onClick={() => setAuthBtn(!authBtn)} variant={"btn transparent"}>
                                Sign in
                            </Button>
                        </div>
                        <img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png" className="image" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
