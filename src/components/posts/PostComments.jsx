import PostCommentList from "./PostCommentList";
import { useAvatar } from "../../hooks/useAvatar";
import { useState } from "react";
const PostComments = ({ post }) => {
  const { avatarURL } = useAvatar(post);
  const [showCommentList, setShowCommentList] = useState(false);

  const toggleAllComments = () => {
    setShowCommentList(!showCommentList);
  };

  return (
    <div>
      <div className="gap-2 mb-3 flex-center lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={toggleAllComments}
        >
          All Comment ▾
        </button>
      </div>

      {showCommentList && <PostCommentList comments={post?.comments} />}
    </div>
  );
};

export default PostComments;
