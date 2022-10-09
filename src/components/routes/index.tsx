import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom";
import SignIn from "../../pages/auth/signIn";
import Compagnies from "../../pages/compagnies";
import Dashboard from "../../pages/dashboard";
import ResetPassword from "../../pages/resetPassword";
import Sheet from "../../pages/sheet";
import UserProfile from "../../pages/userProfile";
import Users from "../../pages/users";
import BlankLayout from "../layout/blankLayout";
import PrivateRoute from "./privateRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index={true} element={<Dashboard
           />} />
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
