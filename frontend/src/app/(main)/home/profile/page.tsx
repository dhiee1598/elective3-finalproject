"use client";

import BlogsCard from "@/components/BlogsCard";
import NewBlogs from "@/components/NewBlogs";
import Profile from "@/components/Profile";
import { useGetUsersBlog } from "@/hooks/useGet";
import { useState } from "react";
import { useUserStore } from "@/store/useStoreUser";
import { isAxiosError } from "axios";
import { usePutUsers } from "@/hooks/usePut";
import { toast } from "react-toastify";

const initial_value = {
  name: "",
  email: "",
  image_path: "",
};
const ProfilePage = () => {
  const getAllBlogs = useGetUsersBlog("/api/users/blogs");
  const { users, setUsers } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [values, setValues] = useState(initial_value);
  const updateUsersInfo = usePutUsers(`/api/users/${users?.userId}`);
  const updateUsersPassword = usePutUsers(
    `/api/users/newpassword/${users?.userId}`,
  );
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

  const handleImageChange = (imagePath: string) => {
    if (users) {
      setUsers({ ...users, image_path: imagePath });
    }
    setIsModalOpen(false);
  };

  const handlePasswordChange = async () => {
    try {
      if (newPassword === confirmPassword) {
        const result = await updateUsersPassword.mutateAsync({
          current_password: currentPassword,
          new_password: newPassword,
        });

        if (result) {
          toast.success("Password has been updated successfully");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
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

  const handleSaveClick = async () => {
    try {
      const data = {
        name: values.name,
        email: values.email,
        image_path: users?.image_path,
      };

      const result = await updateUsersInfo.mutateAsync(data);

      if (result) {
        setUsers(result);
        toast.success("Users successfully update");
        setIsEditing(false);
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
    <div className="min-h-screen bg-gradient-to-r pb-28 pt-36 flex gap-2 justify-center items-center from-slate-950 via-slate-800 to-slate-950 flex-col text-white p-6">
      {users && (
        <>
          <Profile
            users={users}
            isEditing={isEditing}
            setIsModalOpen={setIsModalOpen}
            updateUsersInfo={updateUsersInfo}
            updateUsersPassword={updateUsersPassword}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            handlePasswordChange={handlePasswordChange}
            handleImageChange={handleImageChange}
            currentPassword={currentPassword}
            confirmPassword={confirmPassword}
            newPassword={newPassword}
            handleSaveClick={handleSaveClick}
            isModalOpen={isModalOpen}
            availableImages={availableImages}
            setCurrentPassword={setCurrentPassword}
            setConfirmPassword={setConfirmPassword}
            setNewPassword={setNewPassword}
            values={values}
            setValues={setValues}
          />
          <NewBlogs />
          {getAllBlogs.data && getAllBlogs.data.length > 0 ? (
            getAllBlogs.data.map((values) => (
              <BlogsCard blog={values} user={users} key={values.blogId} />
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
