import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import { usePost } from "../../hooks/usePost";
import Field from "../common/Field";
import useProfile from "../../hooks/useProfile";
import AddIcon from "../../assets/icons/addPhoto.svg";
import { useState } from "react";

const PostEntry = ({ onCreate, isEdit }) => {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();
  const [postImage, setPostImage] = useState(null);
  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      // Create a new FormData instance
      const postFormData = new FormData();
      // Append the content from the form
      postFormData.append("content", formData.content);

      // Append the image if it exists
      if (postImage) {
        postFormData.append("image", postImage);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        postFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.DATA_CREATED,
          data: response.data,
        });
        onCreate();
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  const handlePostImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
    }
  };

  return (
    <div className="relative card">
      <h6 className="mb-3 text-lg font-bold text-center lg:text-xl">
        {isEdit ? "Edit Post" : "Create Post"}
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="flex items-center justify-between gap-2 mb-3 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>
              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
          >
            <img src={AddIcon} alt="Add Photo" />
            Add Photo
          </label>
          <input
            {...register("image")}
            type="file"
            name="image"
            id="photo"
            className="hidden"
            onChange={handlePostImage}
          />
        </div>

        {postImage && <img src={URL.createObjectURL(postImage)} alt="post" />}

        <Field label="" error={errors.content}>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
            name="content"
            id="content"
            placeholder="Share Your Thoughts"
          ></textarea>
        </Field>

        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="font-bold transition-all auth-input bg-lwsGreen text-deepDark hover:opacity-90"
            type="submit"
          >
            {isEdit ? "Update" : "Post"}
          </button>

          {isEdit ? (
            <button
              className="my-2 font-bold transition-all bg-red-400 auth-input text-deepDark hover:opacity-90"
              type="button"
            >
              Discard
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
