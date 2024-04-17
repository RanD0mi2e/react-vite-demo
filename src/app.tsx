import {
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { CounterProvider } from "./stores/counter/contexts/CounterContext";
import { UserProvider } from "./stores/user/contexts/UserContext";
import { getToken } from "./utils/token";
import { Router } from "./router/permission";

const router = Router

export const App = () => {
  // const token = getToken();
  // if

  return (
    <CounterProvider>
      <UserProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </UserProvider>
    </CounterProvider>
  );
};
