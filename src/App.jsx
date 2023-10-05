import routes from "./routes";
import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { SWRConfig } from "swr";
import PostsContextProvider from "./context/PostsContextProvider";
import defaultConfig from "./swr/SwrConfigs ";

export default function App() {
  const router = useRoutes(routes);

  return (
    <PostsContextProvider>
      <SWRConfig value={defaultConfig}>
        <div className="select-none">
          <Navbar />
          <div className="p-4">{router}</div>
        </div>
      </SWRConfig>
    </PostsContextProvider>
  );
}
