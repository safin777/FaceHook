import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    //fetch profile to get the user info
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BSSE_URL}/profile/${auth?.user?.id}`
        );
        setUser(response?.data.user);
        setPost(response?.data.posts);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if(loading){
    return <div> Fetching your Profile data........</div>
  }

  return (
    <>
      <p>{user?.firstName}</p>
    </>
  );
}
