import PostCommentList from "./PostCommentList";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";

const PostComments = ({ post }) => {
  const { auth } = useAuth();
  const { state } = useProfile();

  const avatar = state?.user?.avatar ?? auth?.user?.avatar;

  //state handling
  const [showCommentList, setShowCommentList] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { api } = useAxios();
  //toggle comment list
  const toggleAllComments = () => {
    setShowCommentList(!showCommentList);
  };

  const addComment = async (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      try {
        const response = await api.patch(`/posts/${post.id}/comment`, {
          comment
        });

        console.log(response);

        if (response.status === 200) {
          setComments([...response.data.comments]);
          setComment("");
          setShowCommentList(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="gap-2 mb-3 flex-center lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
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

      {showCommentList && <PostCommentList comments={comments} />}
    </div>
  );
};

export default PostComments;
