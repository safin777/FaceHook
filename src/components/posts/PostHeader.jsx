import { useState } from "react";

import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import TimerIcon from "../../assets/icons/time.svg";

import { getDateDifferenceFromNow } from "../../utils";
import { useAvatar } from "../../hooks/useAvatar";
import { useAuth } from "../../hooks/useAuth";
import { actions } from "../../actions/index";
import { usePost } from "../../hooks/usePost";
import { useAxios } from "../../hooks/useAxios";
3;

const PostHeader = ({ post,onEdit }) => {
  const { dispatch } = usePost();
  const { api } = useAxios();
  const [showActions, setShowActions] = useState(false);
  const { auth } = useAuth();
  const { avatarURL } = useAvatar(post);
  const isMe = auth?.user?.id === post?.author?.id;

  //checking if the author of the post is the same as the logged in user
  //to toggle the action menu on the post

  const toggleAction = () => {
    setShowActions(!showActions);
  };

  const handleEdit = async (e) => {
    onEdit()
  };

  const handleDelete = async (event) => {
    try {
      dispatch({ type: actions.post.DATA_FETCHING });
      console.log("dhsjdsdhjsd");
      const response = await api.delete(`/posts/${post.id}`);
      if (response.status === 200) {
        dispatch({ type: actions.post.POST_DELETED, data: post.id });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
    }
  };

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURL}
          alt=""
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimerIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {`${getDateDifferenceFromNow(post?.createAt)}`}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button onClick={toggleAction}>
            <img src={ThreeDotsIcon} alt="3dots of Action" />
          </button>
        )}

        {showActions && (
          <div className="action-modal-container">
            <button
              className="action-menu-item hover:text-lwsGreen"
              onClick={handleEdit}
            >
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              className="action-menu-item hover:text-red-500"
              onClick={handleDelete}
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
