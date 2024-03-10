import { useProfile } from "../../hooks/useProfile";
import Comment from "./Comment";

const PostComments = ({post}) => {
   const {state}=useProfile()
   return (
      <div>
        <div className="flex-center mb-3 gap-2 lg:gap-4">
          <img
            className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
            alt="avatar"
          />

          <div className="flex-1">
            <input
              type="text"
              className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="post"
              placeholder="What's on your mind?"
            />
          </div>
        </div>
        <div className="mt-4">
         {
            post.comments.length>0?(<button className="text-gray-300 max-md:text-sm">
            All Comment ▾
          </button>):(
            <p>No comments</p>
          )
         }
        </div>
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
          {
            !!post.comments&&post.comments.map((commentObj,index)=><Comment key={`${commentObj.id}${index}`} commentObj={commentObj}/>)
          }
        </div>
      </div>
   );
};

export default PostComments;