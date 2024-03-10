import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Comment from "./Comment";
import useAxios from "../../hooks/useAxios";

const PostComments = ({ post }) => {
  const { auth } = useAuth();
  const [allComments, setAllComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const {api}=useAxios()
  const handleComment = async(e) => { 
    if (e.keyCode===13) {
      const response=await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,{comment}
      )
      if (response.status===200) {
        setAllComments([...response.data.comments])
      }
    }
  };
  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => handleComment(e)}
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div className="mt-4">
        {allComments.length > 0 ? (
          <button className="text-gray-300 max-md:text-sm">
            All Comment ▾
          </button>
        ) : (
          <p>No comments</p>
        )}
      </div>
      <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
        {!!allComments &&
          allComments.map((commentObj, index) => (
            <Comment key={`${commentObj.id}${index}`} commentObj={commentObj} />
          ))}
      </div>
    </div>
  );
};

export default PostComments;