import { useReducer } from "react";
import { PostsContext } from "../contexts";
import { initialState, postReducer } from "../reducers/postReducer";

const PostProvider = ({children}) => {
   const [state,dispatch]=useReducer(postReducer,initialState)
   return (
      <PostsContext.Provider value={{state,dispatch}}>
         {children}
      </PostsContext.Provider>
   );
};

export default PostProvider;