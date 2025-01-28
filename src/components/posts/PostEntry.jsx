import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import { usePost } from "../../hooks/usePost";
import Field from "../common/Field";
import useProfile from "../../hooks/useProfile";
import AddIcon from "../../assets/icons/addPhoto.svg";

const PostEntry = ({ onCreate }) => {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();

  const user = profile?.user ?? auth?.user;

  //necessary methoids from react-hook-form

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.post.DATA_FETCHING });
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        { formData }
      );
      if (response.status === 200) {
        dispatch({
          type: actions.post.DATA_CREATED,
          data: response.data,
        });
        //close the PostEntry UI
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  return (
    <div className="relative card">
      <h6 className="mb-3 text-lg font-bold text-center lg:text-xl">
        Create Post
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
          <input type="file" name="photo" id="photo" className="hidden" />
        </div>

        {/* React hook form for text area */}

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
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
