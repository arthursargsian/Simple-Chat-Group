import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const usersList = createAction("chat/usersList", (value) => {
    return {
        payload: {
            value,
        }
    }
});

export const room = createAsyncThunk("chat/room", async (roomId) => {
    const {data} = await Api.getRoom(roomId);
    return data;
});

export const getUsers = createAsyncThunk("chat/getUsers", async (userIds) => {
    const {data} = await Api.getUsers(userIds);
    return data;
});

export const sendMessages = createAsyncThunk("chat/sendMessages", async (payload) => {
    const {data} = await Api.sendMessages(payload);
    return data;
});

export const getMessages = createAsyncThunk("chat/getMessages", async (roomId) => {
    const {data} = await Api.getMessages(roomId);
    return data;
});



