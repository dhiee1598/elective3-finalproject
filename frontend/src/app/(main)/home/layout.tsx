import AuthWrapper from "@/components/AuthWrapper";
import MainHeader from "@/components/MainHeader";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthWrapper isAdmin={false}>
        <MainHeader />
        <main className="w-full min-w-[380px]">{children}</main>
      </AuthWrapper>
    </>
  );
};

export default MainLayout;
