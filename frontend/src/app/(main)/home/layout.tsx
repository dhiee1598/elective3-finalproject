import AuthWrapper from "@/components/AuthWrapper";
import MainHeader from "@/components/MainHeader";
import QueryProvider from "@/components/QueryProvider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthWrapper isAdmin={false}>
        <QueryProvider>
          <MainHeader />
          <main className="w-full min-w-[380px]">{children}</main>
        </QueryProvider>
      </AuthWrapper>
    </>
  );
};

export default MainLayout;
