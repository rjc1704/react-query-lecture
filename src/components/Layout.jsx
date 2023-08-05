import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}
