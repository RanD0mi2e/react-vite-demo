import {
  RouterProvider, useRoutes,
} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { CounterProvider } from "./stores/counter/contexts/CounterContext";
import { UserProvider } from "./stores/user/contexts/UserContext";
import { Router } from "./router/permission";


export const App = () => {
  const element = useRoutes(Router)
  // const token = getToken();
  // if

  return (
    <CounterProvider>
      <UserProvider>
        <Layout>
          {element}
        </Layout>
      </UserProvider>
    </CounterProvider>
  );
};
