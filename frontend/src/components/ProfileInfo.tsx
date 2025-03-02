"use client";

import { UsersProps } from "@/interfaces/users.props";
import CachedSharpIcon from "@mui/icons-material/CachedSharp";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { isAxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { usePutUsers } from "@/hooks/usePut";

const initial_value = {
  name: "",
  email: "",
  image_path: "",
};

const initial_password = {
  current_password: "",

  new_password: "",
  confirm_password: "",
};

const availableImages: string[] = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png",
  "/images/image8.png",
  "/images/image9.png",
  "/images/image10.png",
  "/images/image11.png",
  "/images/image12.png",
  "/images/image13.png",
];

const ProfileInfo = ({
  users,
  hasPermission,
}: {
  users: UsersProps;
  hasPermission: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(initial_value);
  const [password, setPassword] = useState(initial_password);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateUsersInfo = usePutUsers(`/api/users/${users.userId}`);
  const updatePassword = usePutUsers(`/api/users/newpassword/${users.userId}`);

  // Handling Editing Profile Information
  const handleIsEditingProfile = () => {
    if (isEditing) {
      setValues(initial_value);
      setPassword(initial_password);
      setIsEditing(false);
    } else {
      setValues({
        ...values,
        name: users.name,
        email: users.email,
        image_path: users.image_path,
      });
      setPassword(initial_password);
      setIsEditing(true);
    }
  };

  // Handle Selecting New Image Avatar
  const handleImageChange = (imagePath: string) => {
    setValues({
      ...values,
      image_path: imagePath,
    });

    setIsModalOpen(false);
  };

  // Handle Save Profile Info
  const handleSaveClick = async () => {
    try {
      const response = await updateUsersInfo.mutateAsync(values);

      if (response) {
        toast.success("Users successfully update");
        setIsEditing(false);
        setPassword(initial_password);
        setValues(initial_value);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        console.log(error);
      }
    }
  };

  // Handle Change Password Click
  const handleChangePasswordClick = async () => {
    try {
      if (password.new_password === password.confirm_password) {
        const result = await updatePassword.mutateAsync({
          current_password: password.current_password,
          new_password: password.new_password,
        });

        if (result) {
          toast.success("Password has been updated successfully");
          setPassword(initial_password);
        }
      } else {
        toast.error("New password and Confirm password do not match");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full border border-gray-200 max-w-lg bg-slate-950 shadow-md shadow-black bg-opacity-60 rounded-lg p-6 flex flex-col items-center mb-4">
        {!hasPermission && (
          <>
            <Image
              src={users.image_path}
              alt="Profile Avatar"
              width={150}
              height={150}
              className="rounded-full object-cover border-4 border-white"
            />
            <div className="text-center mb-4 mt-2">
              <h2 className="text-xl font-bold">{users.name}</h2>
              <p>{users.email}</p>
            </div>
          </>
        )}
        {hasPermission && !isEditing && (
          <>
            <Image
              src={users.image_path}
              alt="Profile Avatar"
              width={150}
              height={150}
              className="rounded-full object-cover border-4 border-white"
            />
            <div className="text-center mb-4 mt-2">
              <h2 className="text-xl font-bold">{users.name}</h2>
              <p>{users.email}</p>
            </div>
            <button
              onClick={handleIsEditingProfile}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l mb-4"
            >
              Edit Profile
            </button>
          </>
        )}
        {isEditing && (
          <>
            <div className="relative w-36 h-36 mb-6">
              <Image
                src={values.image_path}
                alt="Profile Avatar"
                width={150}
                height={150}
                className="rounded-full object-cover border-4 border-white"
              />
              <button
                className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="text-white text-xs">Upload</span>
              </button>
            </div>
            <div className="text-center mb-4">
              <input
                type="text"
                value={values.name}
                className="text-center text-xl font-bold p-2 mb-4 bg-transparent focus:outline-none text-white placeholder-white"
                autoFocus
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
              <input
                type="email"
                value={values.email}
                className="text-center text-lg p-2 mb-4 bg-transparent focus:outline-none text-white placeholder-white"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="text-center mb-4">
              <input
                type="password"
                value={password.current_password}
                onChange={(e) =>
                  setPassword({ ...password, current_password: e.target.value })
                }
                placeholder="Current Password"
                className="p-2 mb-4 bg-transparent text-white placeholder-white border-b-2 border-white"
              />
              <input
                type="password"
                value={password.new_password}
                onChange={(e) =>
                  setPassword({ ...password, new_password: e.target.value })
                }
                placeholder="New Password"
                className="p-2 mb-4 bg-transparent text-white placeholder-white border-b-2 border-white"
              />
              <input
                type="password"
                value={password.confirm_password}
                onChange={(e) =>
                  setPassword({ ...password, confirm_password: e.target.value })
                }
                placeholder="Confirm Password"
                className="p-2 mb-4 bg-transparent text-white placeholder-white border-b-2 border-white"
              />
            </div>
            <button
              onClick={handleChangePasswordClick}
              disabled={updateUsersInfo.isPending || updatePassword.isPending}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l mb-2"
            >
              {updatePassword.isPending ? (
                <>
                  Updating...<span> </span>
                  <CachedSharpIcon className="animate-spin" />
                </>
              ) : (
                "Change Password"
              )}
            </button>
            <button
              onClick={handleSaveClick}
              disabled={updateUsersInfo.isPending || updatePassword.isPending}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l mb-2"
            >
              {updateUsersInfo.isPending ? (
                <>
                  Saving...<span> </span>
                  <CachedSharpIcon className="animate-spin" />
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={handleIsEditingProfile}
              disabled={updateUsersInfo.isPending || updatePassword.isPending}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l"
            >
              Close
            </button>
          </>
        )}
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
      >
        <DialogTitle>Select an Avatar</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-2 gap-4">
            {availableImages.map((imagePath) => (
              <div
                key={imagePath}
                className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleImageChange(imagePath)}
              >
                <Image
                  src={imagePath}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default ProfileInfo;
