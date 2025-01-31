import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostEntry from "./PostEntry";
import PostHeader from "./PostHeader";
import { useState } from "react";

const PostCard = ({ post }) => {
  const [showPostEdit, setShowPostEdit] = useState(false);

  const handleOnEdit = (e) => {
    setShowPostEdit(true);
  };
  return (
    <>
      {showPostEdit ? (
        <PostEntry isEdit={showPostEdit} />
      ) : (
        <article className="mt-6 card lg:mt-8">
          <PostHeader post={post} onEdit={handleOnEdit} />
          <PostBody poster={post?.image} content={post?.content} />
          <PostAction post={post} commentCount={post?.comments?.length} />
          <PostComments post={post} />
        </article>
      )}
    </>
  );
};

export default PostCard;
