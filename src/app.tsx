import {
  RouterProvider,
} from "react-router-dom";
import { CounterProvider } from "./stores/counter/contexts/CounterContext";
import { UserProvider } from "./stores/user/contexts/UserContext";
import { Router } from "./router/permission";


export const App = () => {
  const router = Router
  // const token = getToken();
  // if

  return (
    <CounterProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </CounterProvider>
  );
};
