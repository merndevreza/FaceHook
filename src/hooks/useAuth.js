import { useContext, useDebugValue } from "react";
import { AuthContext } from "../contexts";

const useAuth = () => {
   // Here we can debug this hook in future.
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth.user ? "User logged in" : "User logged out"
  );
  return useContext(AuthContext);
};
export { useAuth };
