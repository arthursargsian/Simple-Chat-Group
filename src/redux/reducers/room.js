import {createReducer} from "@reduxjs/toolkit";
import {createRoom, getStateRooms, roomData, roomList, searchRoom, searchValue, verifyAccount} from "../actions/room";

const initialState = {
    rooms: [],
    roomsStatus: "",
    createRoomMessage: "",
    createRoomStatus: "",
    searchResultRoom: [],
    searchResultRo0mStatus: "",
    searchState: "",
    verifyAnswer: [],
    roomData: [],
    roomDataStatus: "",
    roomStatus: [],
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(roomList.pending, (state, action) => {
            state.roomsStatus = "loading";
        })
        .addCase(roomList.fulfilled, (state, action) => {
            state.roomsStatus = "success";
            state.rooms = action.payload;
        })
        .addCase(roomList.rejected, (state, action) => {
            state.roomsStatus = "fail";
        })
        .addCase(createRoom.pending, (state, action) => {
            state.createRoomStatus = "loading";
        })
        .addCase(createRoom.fulfilled, (state, action) => {
            state.createRoomStatus = "success";
            state.rooms = action.payload;
        })
        .addCase(createRoom.rejected, (state, action) => {
            state.createRoomStatus = "fail";
            state.createRoomMessage = action.payload.response.data.errors;
        })
        .addCase(searchRoom.pending, (state, action) => {
            state.searchResultRoomStatus = "loading";
        })
        .addCase(searchRoom.fulfilled, (state, action) => {
            state.searchResultRoomStatus = "success";
            state.searchResultRoom = action.payload;
        })
        .addCase(searchRoom.rejected, (state, action) => {
            state.searchResultRoomStatus = "fail";
        })
        .addCase(searchValue, (state, action) => {
            state.searchState = action.payload.value;
        })
        .addCase(verifyAccount.pending, (state, action) => {
            state.verifyAnswer = "loading";
        })
        .addCase(verifyAccount.fulfilled, (state, action) => {
            state.verifyAnswer = "success";
        })
        .addCase(verifyAccount.rejected, (state, action) => {
            state.verifyAnswer = "fail";
        })
        .addCase(roomData.pending, (state, action) => {
            state.roomDataStatus = "loading";
        })
        .addCase(roomData.fulfilled, (state, action) => {
            state.roomDataStatus = "success";
            state.roomData = action.payload;
        })
        .addCase(roomData.rejected, (state, action) => {
            state.roomDataStatus = "fail";
        })
        .addCase(getStateRooms.fulfilled, (state, action) => {
            state.roomStatus = action.payload;
        })
});



