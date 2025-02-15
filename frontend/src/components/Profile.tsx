"use client";

import { useUserStore } from "@/store/useStoreUser";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import api from "@/utilities/axios";
import { isAxiosError } from "axios";

const initial_value = {
  name: "",
  email: "",
  image_path: "",
};

const Profile = () => {
  const { users, setUsers } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [values, setValues] = useState(initial_value);

  const availableImages = [
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

  const handleImageChange = (imagePath: string) => {
    if (users) {
      setUsers({ ...users, image_path: imagePath });
    }
    setIsModalOpen(false);
  };

  const handlePasswordChange = async () => {
    try {
      if (newPassword === confirmPassword) {
        const response = await api.put(
          `/api/users/newpassword/${users?.userId}`,
          { current_password: currentPassword, new_password: newPassword },
        );
        toast.success(response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
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

  const handleSaveClick = async () => {
    try {
      const data = {
        name: values.name,
        email: values.email,
        image_path: users?.image_path,
      };

      const response = await api.put(`/api/users/${users?.userId}`, data);

      setUsers(response.data.users);
      toast.success(response.data.message);

      setIsEditing(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        console.log(error);
      }
    }
  };

  const handleOpenModal = () => {
    if (users) {
      setValues({
        ...values,
        name: users.name,
        email: users.email,
        image_path: users.image_path,
      });
    }
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    if (users) {
      setUsers({ ...users, image_path: values.image_path });
    }
    setValues(initial_value);
    setIsEditing(false);
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
  };

  return (
    <>
      <div className="w-full max-w-lg bg-black bg-opacity-60 rounded-lg p-6 flex flex-col items-center">
        <div className="relative w-36 h-36 mb-6">
          {users && (
            <Image
              src={users.image_path}
              alt="Profile Avatar"
              width={150}
              height={150}
              className="rounded-full object-cover border-4 border-white"
            />
          )}

          {isEditing && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer"
            >
              <span className="text-white text-xs">Upload</span>
            </button>
          )}
        </div>

        {users && !isEditing && (
          <>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold">{users.name}</h2>
              <p>{users.email}</p>
            </div>
            <button
              onClick={handleOpenModal}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l mb-4"
            >
              Edit Profile
            </button>
          </>
        )}

        {isEditing && (
          <>
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
                value={currentPassword}
                placeholder="Current Password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="p-2 mb-4 bg-transparent text-white placeholder-white border-b-2 border-white"
              />
              <input
                type="password"
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 mb-4 bg-transparent text-white placeholder-white border-b-2 border-white"
              />
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 mb-4 bg-transparent text-white placeholder-white border-b-2 border-white"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l mb-2"
            >
              Change Password
            </button>
            <button
              onClick={handleSaveClick}
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l mb-2"
            >
              Save Changes
            </button>
            <button
              onClick={handleCloseModal}
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

export default Profile;
