import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Auth from "./pages/auth/Auth";
import NotFound from "./pages/common/NotFound";
import Discover from "./pages/room/Discover";
import PrivateRouter from "./private/PrivateRouter";
import PublicRouter from "./private/PublicRouter";
import Chat from "./pages/chat/Chat";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicRouter><Auth/></PublicRouter>}/>
                <Route path="/discover" element={<PrivateRouter><Discover/></PrivateRouter>}/>
                <Route path="/chat/:id" element={<PrivateRouter><Chat/></PrivateRouter>}/>
                <Route path="not-found" element={<NotFound/>}/>
                <Route path="*" element={<Navigate to="not-found"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
