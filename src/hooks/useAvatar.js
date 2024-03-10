import { useProfile } from "./useProfile";

const useAvatar = (post) => {
  const { state } = useProfile();
  const isMe = state?.user?.id === post?.author?.id;
  let avatar;
  if (isMe) {
    avatar = state?.user?.avatar;
  } else {
    avatar = post?.author?.avatar;
  }
  const avatarUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`;
  return avatarUrl;
};
export default useAvatar;
