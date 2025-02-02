import AuthWrapper from "@/components/AuthWrapper";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthWrapper isAdmin={false}>{children}</AuthWrapper>
    </>
  );
};

export default MainLayout;
