class Utils {
    static getToken() {
        return localStorage.getItem("token") || sessionStorage.getItem("token");
    }

    static getUser() {
        const userString = localStorage.getItem("user") || sessionStorage.getItem("user");
        return userString ? JSON.parse(userString) : null;
    }
}

export default Utils;
