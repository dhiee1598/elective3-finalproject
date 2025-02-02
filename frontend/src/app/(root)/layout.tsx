import AuthWrapper from "@/components/AuthWrapper";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthWrapper>
        <Header />
        {children}
        <Footer />
      </AuthWrapper>
    </>
  );
};

export default RootLayout;
