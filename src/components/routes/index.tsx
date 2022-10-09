import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom";
import BlankLayout from "../layout/blankLayout";
import Users from "../pages/users";
import Compagnies from "../pages/compagnies";
import Dashboard from "../pages/dashboard";
import SignIn from "../pages/dashboard/auth/signIn";
import PrivateRoute from "./privateRoute";
import UserProfile from "../pages/userProfile";
import Sheet from "../pages/sheet";
import ResetPassword from "../pages/resetPassword";

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index={true} element={<Dashboard />} />
          <Route path="/companies" element={<Compagnies />}></Route>
          <Route path="/accounts" element={<Users />}></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/sheets/:id" element={<Sheet />}></Route>
        </Route>
      </ReactRoutes>

      <ReactRoutes>
        <Route element={<BlankLayout />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
}
