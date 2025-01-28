import LikeIcon from "../../assets/icons/like.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import ShareIcon from "../../assets/icons/share.svg";
import LikeFilled from "../../assets/icons/like-filled.svg";
import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const PostAction = ({ post, commentCount }) => {
  const { auth } = useAuth();
  const [isLiked, setIsLiked] = useState(post?.likes.includes(auth?.user?.id));
  const { api } = useAxios();
  

  const handleLike = async () => {
    try {
      const response = await api.patch(`/posts/${post.id}/like`);
      if (response.status === 200) {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.log(error);
      setIsLiked(false);
    }
  };
  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
        onClick={handleLike}
      >
        <img className="w-6" src={isLiked ? LikeFilled : LikeIcon} alt="Like" />
        <span>{isLiked ? "Liked" : "Like"}</span>
      </button>

      <button className="px-6 py-3 space-x-2 text-xs icon-btn lg:px-12 lg:text-sm">
        <img src={CommentIcon} alt="Comment" />
        <span>Comment({commentCount})</span>
      </button>

      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={ShareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default PostAction;
