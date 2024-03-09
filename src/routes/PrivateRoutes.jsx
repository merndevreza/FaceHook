import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/common/Header";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  return (
    <div>
      {auth.user ? (
        <>
          <ProfileProvider>
          <Header />
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoutes;
