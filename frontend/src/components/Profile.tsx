"use client";

import { ToastContainer } from "react-toastify";
import Image from "next/image";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import CachedSharpIcon from "@mui/icons-material/CachedSharp";
import { ProfileInitialValue, UsersProps } from "@/interfaces/users.props";
import { UseMutationResult } from "@tanstack/react-query";

const Profile = ({
  users,
  isEditing,
  setIsModalOpen,
  updateUsersInfo,
  updateUsersPassword,
  handleOpenModal,
  handleCloseModal,
  handlePasswordChange,
  currentPassword,
  confirmPassword,
  newPassword,
  handleImageChange,
  handleSaveClick,
  isModalOpen,
  availableImages,
  setCurrentPassword,
  setConfirmPassword,
  setNewPassword,
  values,
  setValues,
}: {
  users: UsersProps;
  isEditing: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  updateUsersInfo: UseMutationResult<UsersProps, Error, object, unknown>;
  updateUsersPassword: UseMutationResult<UsersProps, Error, object, unknown>;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handlePasswordChange: () => void;
  handleSaveClick: () => void;
  handleImageChange: (imagePath: string) => void;
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
  isModalOpen: boolean;
  availableImages: string[];
  setCurrentPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  values: ProfileInitialValue;
  setValues: React.Dispatch<React.SetStateAction<ProfileInitialValue>>;
}) => {
  return (
    <>
      <div className="w-full max-w-lg bg-black bg-opacity-60 rounded-lg p-6 flex flex-col items-center">
        <div className="relative w-36 h-36 mb-6">
          <Image
            src={users.image_path}
            alt="Profile Avatar"
            width={150}
            height={150}
            className="rounded-full object-cover border-4 border-white"
          />
          {isEditing && (
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={
                updateUsersInfo.isPending || updateUsersPassword.isPending
              }
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
              disabled={
                updateUsersInfo.isPending || updateUsersPassword.isPending
              }
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l mb-2"
            >
              {updateUsersPassword.isPending ? (
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
              disabled={
                updateUsersInfo.isPending || updateUsersPassword.isPending
              }
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
              onClick={handleCloseModal}
              disabled={
                updateUsersInfo.isPending || updateUsersPassword.isPending
              }
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
