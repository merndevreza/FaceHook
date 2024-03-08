import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const { api } = useAxios();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        ); 
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [api,auth?.user?.id]);
  if (loading) {
    return <p>Fetching your Profile data...</p>;
  }
  return (
    <>
      <div className="flex flex-col items-center py-8 text-center">
        <div>
          <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
            {
            `${user?.firstName} ${user?.lastName}`
            }
          </h3>
        </div>
        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
      </div>

      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts {posts.length}</h4>
    </>
  );
};

export default ProfilePage;