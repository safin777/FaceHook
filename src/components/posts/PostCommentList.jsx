import useProfile from "../../hooks/useProfile";
import { useAuth } from "../../hooks/useAuth";

const PostCommentList = ({ comments }) => {
  const { state } = useProfile();
  const { auth } = useAuth();
  return (
    <div className="pl-2 space-y-4 divide-y divide-lighterDark lg:pl-3">
      {comments &&
        comments.map((comment) => {
          let avatar = "";
          if (comment?.author?.id === auth?.user?.id) {
            avatar = state?.user?.avatar ?? auth?.user?.avatar;
          } else {
            avatar = comment?.author?.avatar;
          }
          return (
            <div className="flex items-center gap-3 pt-4" key={comment?.id}>
              <img
                className="rounded-full max-w-6 max-h-6"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`}
                alt="avatar"
              />
              <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                  <span>{comment?.author?.name}</span>
                  <span>{comment?.comment}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PostCommentList;
