import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { actions } from "../actions";
import PostsList from "../components/posts/PostsList";
import usePost from "../hooks/usePosts";
import NewPost from "../components/posts/NewPost";

const HomePage = () => {
  const { state, dispatch } = usePost();
  const { api } = useAxios();
  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchPosts = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchPosts();
  }, []);
  if (state.loading) {
    return <p>Loading...</p>;
  }

  if (state.error) {
    return <p>An Error Occurred: {state.error.message} </p>;
  }
  return (
    <div>
      <NewPost/>
      {state.posts.length > 0 ? (
        <PostsList posts={state.posts} />
      ) : (
        <p>No post found</p>
      )}
    </div>
  );
};

export default HomePage;
