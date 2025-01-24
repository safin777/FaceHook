import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import { useEffect } from "react";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../profile/ProfileInfo";
import MyPosts from "../profile/MyPosts";

export default function ProfilePage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    //fetch profile to get the user info
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        // setUser(response?.data.user);
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div> Fetching your Profile data........</div>;
  }

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
}
