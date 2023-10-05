import Home from "./pages/Home";
import Posts from "./pages/Posts";
import MainPost from "./pages/MainPost"
import Pictures from "./pages/Pictures"


const routes = [
  { path: "/", element: <Home /> },
  { path: "/posts/:page", element: <Posts /> },
  { path: "/posts/:page/:id", element: <MainPost /> },
  { path: "/pictures", element: <Pictures /> },

];
export default routes;
