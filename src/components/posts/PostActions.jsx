import likeEmpty from "../../assets/icons/like-empty.svg";
import likeFilled from "../../assets/icons/like-filled.svg";
import commentIcon from "../../assets/icons/comment.svg";
import shareIcon from "../../assets/icons/share.svg";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const PostActions = ({ post }) => {
  const { auth } = useAuth();
  const [liked, setLiked] = useState(post.likes.includes(auth.user.id));
  const { api } = useAxios();
  const handleLike = async () => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`
      );
      if (response.status === 200) {
        setLiked(!liked);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button
        onClick={handleLike}
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        <img className="w-6" src={liked ? likeFilled : likeEmpty} alt="Like" />
        {!liked && <span>Like</span>}
      </button>

      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img src={commentIcon} alt="Comment" />
        <span>
          Comment{post.comments.length > 0 && `(${post.comments.length})`}
        </span>
      </button>
      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={shareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default PostActions;
