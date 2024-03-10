import { useContext } from "react";
import { PostsContext } from "../contexts";

const usePost = () => {
  return useContext(PostsContext);
};
export default usePost;
