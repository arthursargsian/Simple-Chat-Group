import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const roomList = createAsyncThunk("room/roomList", async () => {
    const {data} = await Api.roomList();
    return data;
});

export const createRoom = createAsyncThunk("room/createRoom", async (payload, {rejectWithValue}) => {
    try {
        const {data} = await Api.createRoom(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const searchRoom = createAsyncThunk("room/searchRoom", async (name) => {
    const {data} = await Api.searchRoom(name);
    return data;
});

export const searchValue = createAction("room/searchValue", (value) => {
    return {
        payload: {
            value,
        }
    }
});

export const verifyAccount = createAsyncThunk("room/verifyAccount", async (payload, {rejectWithValue}) => {
    try {
        const {data} = await Api.verifyAccount(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const roomData = createAsyncThunk("room/roomData", async (room_id) => {
    const {data} = await Api.roomData(room_id);
    return data;
});

export const getStateRooms = createAsyncThunk("room/getStateRooms", async () => {
    const {data} = await Api.getStateRooms();
    return data;
});
