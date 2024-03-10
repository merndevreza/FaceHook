import { useProfile } from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import { useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";
const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const fileUploadRef = useRef();
  const { api } = useAxios();

  const handleFileUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.addEventListener("change", uploadImageDisplay);
    fileUploadRef.current.click();
  };
  const uploadImageDisplay = async () => {
    dispatch({
      type: actions.profile.DATA_FETCHING,
    });
    try {
      const formData = new FormData();
      for (const file of fileUploadRef.current.files) {
        formData.append("avatar", file);
      }
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="w-[200px] h-[200px] object-cover object-top bg-white rounded-full"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.firstName}
      />
      <form onSubmit={handleFileUpload}>
        <button
          type="submit"
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input ref={fileUploadRef} type="file" name="file" id="file" hidden />
      </form>
    </div>
  );
};

export default ProfileImage;
