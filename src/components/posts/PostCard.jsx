import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

const PostCard = ({ post }) => {
  const { id, author, createAt, content, image, comments, postType } = post; 
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody post={post}  image={image} content={content} />
      <PostActions post={post}  totalComments={comments.length} />
      <PostComments post={post}/>
    </article>
  );
};

export default PostCard;
