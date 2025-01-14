import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import css from "./style.module.css";

const ShaderLayouts = () => {
  return (
    <>
      <header>
        <div className={css.container}>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/movies">Movies</NavLink>
          </nav>
        </div>
      </header>
      <div className={css.container}>
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default ShaderLayouts;
