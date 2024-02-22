import {createReducer} from "@reduxjs/toolkit";
import {usersList, room, getUsers, getMessages} from "../actions/chat";

const initialState = {
    usersListState: false,
    roomData: [],
    roomStatus: "",
    usersData: [],
    usersDataStatus: false,
    messages: [],
    messagesStatus: false,
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(usersList, (state, action) => {
            state.usersListState = action.payload.value;
        })
        .addCase(room.pending, (state, action) => {
            state.roomStatus = "loading";
        })
        .addCase(room.fulfilled, (state, action) => {
            state.roomStatus = "success";
            state.roomData = action.payload;
        })
        .addCase(room.rejected, (state, action) => {
            state.roomStatus = "fail";
        })
        .addCase(getUsers.pending, (state, action) => {
            state.usersDataStatus = false;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.usersDataStatus = true;
            state.usersData = action.payload;
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.usersDataStatus = false;
        })
        .addCase(getMessages.pending, (state, action) => {
            state.messagesStatus = false;
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.messagesStatus = true;
            state.messages = action.payload;
        })
        .addCase(getMessages.rejected, (state, action) => {
            state.messagesStatus = false;
        })
});


