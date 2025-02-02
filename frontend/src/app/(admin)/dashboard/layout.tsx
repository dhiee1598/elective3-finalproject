import AuthWrapper from "@/components/AuthWrapper";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthWrapper isAdmin={true}>{children}</AuthWrapper>
    </>
  );
};

export default AdminLayout;
