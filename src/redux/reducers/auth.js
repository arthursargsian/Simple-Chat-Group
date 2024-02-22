import {createReducer} from "@reduxjs/toolkit";
import {authSignUp, authLogIn, logOut, getUser} from "../actions/auth";
import Utils from "../../Utils";

const initialState = {
    signUpStatus: "",
    signUpMessage: "",
    signInStatus: "",
    signInMessage: "",
    token: Utils.getToken() || "",
    user: Utils.getUser() || [],
    storageStatus: false,
    users: [],
    userStatus: "",
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(authSignUp.pending, (state, action) => {
            state.signUpStatus = "loading";
        })
        .addCase(authSignUp.fulfilled, (state, action) => {
            state.signUpStatus = "success";
            state.signUpMessage = action.payload.auth;
            state.token = action.payload.token;
            state.user = action.payload;
            localStorage.setItem("token", state.token);
            localStorage.setItem("user", JSON.stringify(state.user.user));
        })
        .addCase(authSignUp.rejected, (state, action) => {
            state.signUpStatus = "fail";
            state.signUpMessage = action.payload.response.data.errors;
        })
        .addCase(authLogIn.pending, (state, action) => {
            state.signInMessage = "loading";
        })
        .addCase(authLogIn.fulfilled, (state, action) => {
            state.signInStatus = "success";
            state.signInMessage = action.payload.data.auth;
            state.signInMessage = action.payload.storage;
            state.token = action.payload.data.token;
            state.user = action.payload.data;
            action.payload.storage ? localStorage.setItem("token", state.token) : sessionStorage.setItem("token", state.token);
            action.payload.storage ? localStorage.setItem("user", JSON.stringify(state.user.user)) : sessionStorage.setItem("user", JSON.stringify(state.user.user));
        })
        .addCase(authLogIn.rejected, (state, action) => {
            state.signInStatus = "fail";
            state.signInMessage = action.payload.response.data.errors;
        })
        .addCase(logOut, () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
        })
        .addCase(getUser.pending, (state, action) => {
            state.usersStatus = "loading";
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.usersStatus = "success";
            console.log(action.payload)
            state.users = action.payload;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.usersStatus = "fail";
        })
});


