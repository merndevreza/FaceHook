import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/common/Header";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "../providers/PostProvider";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  return (
    <div>
      {auth.user ? (
        <>
          <PostProvider>
            <ProfileProvider>
              <Header />
              <main className="mx-auto max-w-[1020px] py-8">
                <div className="container">
                  <Outlet />
                </div>
              </main>
            </ProfileProvider>
          </PostProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoutes;
