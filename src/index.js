import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/style/style.scss";
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import reducers from "./redux/reducers";
import {ToastContainer} from "react-toastify";
import Modal from "react-modal";

const store = configureStore({
    reducer: reducers,
    devTools: true,
});

Modal.setAppElement(document.body);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <ToastContainer/>
        <App/>
    </Provider>
);

reportWebVitals();
