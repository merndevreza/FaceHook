import { useProfile } from "../../hooks/useProfile";

const Comment = ({ commentObj }) => {
  const { state } = useProfile();
  const { author, comment } = commentObj;
  let authImg;
  if (state?.user?.id === author.id) {
    authImg = state?.user?.avatar;
  } else {
    authImg = author?.avatar;
  }
  return (
    <div className="flex items-center gap-3 pt-4">
      <img
        className="max-w-6 max-h-6 rounded-full"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${authImg}`}
        alt="avatar"
      />
      <div>
        <div className="flex gap-1 text-xs lg:text-sm">
          <span>{author?.name}:</span>
          <span>{comment}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
