import "./App.css";
import { Routes, Route } from "react-router-dom";
import ShaderLayouts from "./components/ShaderLayouts/ShaderLayouts";
import { lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const Movie = lazy(() => import("./pages/Movie"));
const Cast = lazy(() => import("./pages/Cast"));
const Reviews = lazy(() => import("./pages/Reviews"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ShaderLayouts />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<Movie />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
