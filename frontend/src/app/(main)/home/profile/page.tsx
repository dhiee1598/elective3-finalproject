import NewBlogs from "@/components/NewBlogs";
import Profile from "@/components/Profile";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r pb-28 pt-36 flex gap-2 justify-center items-center from-slate-950 via-slate-800 to-slate-950 flex-col text-white p-6">
      <Profile />
      <NewBlogs />
    </div>
  );
};

export default ProfilePage;
