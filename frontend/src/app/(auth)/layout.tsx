import QueryProvider from "@/components/QueryProvider";
import AuthWrapper from "@/components/AuthWrapper";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>
        <AuthWrapper>{children}</AuthWrapper>
      </QueryProvider>
    </>
  );
};

export default AuthLayout;
