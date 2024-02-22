import axios from "axios";
import Utils from "../Utils";

const api = axios.create({
    baseURL: "http://localhost:4000/"
});

api.interceptors.request.use((config) => {
    const token = Utils.getToken();
    if (token) config.headers.Authorization = token;
    return config;
}, (error) => Promise.reject(error));

class Api {
    static authSignUp(payload) {
        return api.post("/api/auth/register", {
            handle: payload.handle,
            username: payload.username,
            email: payload.email,
            password: payload.password,
        });
    }

    static authLogIn(payload) {
        return api.post("api/auth/login", {
            email: payload.email,
            password: payload.password,
        });
    }

    static roomList() {
        return api.get("api/room");
    }

    static createRoom(payload) {
        return api.post("api/room", {
            room_name: payload.name,
            password: payload.password ? payload.password : null,
        });
    }

    static searchRoom(room_name) {
        return api.post("api/room/search", {room_name});
    }

    static getRoom(room_id) {
        return api.get(`api/room/room/${room_id}`);
    }

    static getUsers(userIds) {
        return api.post("api/user/users", {userIds,});
    }

    static verifyAccount(payload) {
        return api.post("api/room/verify", {
            password: payload.roomPassword ? payload.roomPassword : null,
            room_name: payload.roomName,
            userId: payload.userid ? payload.userid : null,
        });
    }

    static roomData(room_Id) {
        return api.post("api/room/data", {room_Id,});
    }

    static sendMessages(payload) {
        return api.post("api/messages", {
            content: payload.content,
            roomId: payload.roomId
        });
    }

    static getMessages(roomId) {
        return api.get(`api/messages/${roomId}`);
    }

    static getUser(userName) {
        return api.post("api/user/user", {userName,});
    }

    static getStateRooms() {
        return api.get("api/room/status");
    }
}

export default Api;
