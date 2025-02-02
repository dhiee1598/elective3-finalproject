import AuthWrapper from "@/components/AuthWrapper";
import Header from "../../components/Header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthWrapper>
        <Header />
        {children}
      </AuthWrapper>
    </>
  );
};

export default RootLayout;
