import { ProfileContext } from "../context";
import { useReducer } from "react";
import { profileReducer, initailState } from "../reducers/ProfileReducer";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initailState);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
