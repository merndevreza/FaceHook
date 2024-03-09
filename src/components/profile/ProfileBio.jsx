import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import editIcon from "../../assets/icons/edit.svg";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";

const ProfileBio = () => {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);
  const {api}=useAxios()
  
  const handleEditBio = async () => {
   dispatch({ type: actions.profile.DATA_FETCHING });
   try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        {bio}
      );
      console.log(bio);
      console.log(response.data);
      if (response.status===200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
        
      }
      setEditMode(false);
      
   } catch (error) {
      dispatch({
         type: actions.profile.DATA_FETCH_ERROR,
         error: error.message,
     });
   }
  };
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className="bg-transparent  rounded border border-gray-600 p-2"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            cols="55"
            rows="5"
          ></textarea>
        )}
      </div>
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="flex-center h-7 w-7 rounded-full "
        >
          <img src={editIcon} alt="Edit" />
        </button>
      ) : (
        <button
          onClick={handleEditBio}
          className="flex-center h-7 w-7 rounded-full bg-green-600"
        >
          ✓
        </button>
      )}
    </div>
  );
};

export default ProfileBio;
