import AuthWrapper from "@/components/AuthWrapper";
import MainHeader from "@/components/MainHeader";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthWrapper isAdmin={false}>
        <MainHeader />
        {children}
      </AuthWrapper>
    </>
  );
};

export default MainLayout;
