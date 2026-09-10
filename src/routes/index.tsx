import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../features/auth/pages/Profile";
import Home from "../features/events/pages/Home";
import Cadastro from "../features/auth/pages/Cadastro";
import Login from "../features/auth/pages/Login";
import CreateEvent from "../features/events/pages/CreateEvent";
import EventDetails from "../features/events/pages/EventDetails";
import EditEvent from "../features/events/pages/EditEvent";
import Explore from "../features/events/pages/Explore";
import MyEvents from "../features/events/pages/MyEvents";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/:id/edit" element={<EditEvent />} />
        <Route path="/explore" element={<Explore />} />

        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-events" element={<MyEvents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
