"use client";

import ProfileInfo from "@/components/ProfileInfo";
import { useGetSingleUser, useGetUsersBlog } from "@/hooks/useGet";
import { useParams } from "next/navigation";
import { Skeleton, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useStoreUser";
import NewBlogs from "@/components/NewBlogs";
import BlogsCard from "@/components/BlogsCard";
import { motion } from "motion/react";

const ProfilePage = () => {
  const params = useParams();
  const userId = params?.userId as string;
  const getSingleUsers = useGetSingleUser("/api/users", userId);
  const getUserBlogs = useGetUsersBlog(`/api/blogs/users/${userId}`);
  const activeUsers = useUserStore();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (getSingleUsers.data && activeUsers.users) {
      setHasPermission(getSingleUsers.data.userId === activeUsers.users.userId);
    }
  }, [getSingleUsers.data, activeUsers.users]);

  return (
    <div className="min-h-screen bg-gradient-to-r pb-28 pt-36 flex justify-center items-center from-slate-950 via-slate-800 to-slate-950 flex-col text-white p-6">
      {getSingleUsers.isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "rgba(255, 255, 255, 0.1)",
            p: 3,
            borderRadius: 2,
            width: 300,
          }}
        >
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton variant="text" width={150} height={30} sx={{ mt: 2 }} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            sx={{ mt: 2, borderRadius: 1 }}
          />
        </Box>
      ) : (
        getSingleUsers.data && (
          <ProfileInfo
            users={getSingleUsers.data}
            hasPermission={hasPermission}
          />
        )
      )}
      {hasPermission && <NewBlogs />}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {getUserBlogs.isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  p: 2,
                  borderRadius: 2,
                  width: 300,
                }}
              >
                <Skeleton variant="rectangular" width="100%" height={180} />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={30}
                  sx={{ mt: 2 }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={20}
                  sx={{ mt: 1 }}
                />
              </Box>
            </motion.div>
          ))
        ) : getUserBlogs.data && getUserBlogs.data.length > 0 ? (
          getUserBlogs.data.map((blog, index) => (
            <motion.div
              key={blog.blogId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <BlogsCard blog={blog} activeUser={activeUsers.users} />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-400 text-lg mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            🚀 No blog posts available.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
