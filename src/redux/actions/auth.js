import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const authSignUp = createAsyncThunk("auth/authSignUp", async (payload, {rejectWithValue}) => {
    try {
        const {data} = await Api.authSignUp(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const authLogIn = createAsyncThunk("auth/authLogIn", async (payload, {rejectWithValue}) => {
    try {
        const {data} = await Api.authLogIn(payload.complateForm);
        return {data, storage: payload.remember};
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getUser = createAsyncThunk("auth/getUser", async (username) => {
    const {data} = await Api.getUser(username);
    return data;
});

export const logOut = createAction("auth/logOut");
