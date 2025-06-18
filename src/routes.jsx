import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import AddContact from "./pages/AddContact";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddContact />} />
            <Route path="edit/:id" element={<AddContact />} />
            <Route path="demo" element={<Demo />} />
            <Route path="single/:theId" element={<Single />} />
        </Route>
    )
);
