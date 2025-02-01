import QueryProvider from "@/components/QueryProvider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <QueryProvider>{children}</QueryProvider>
    </div>
  );
};

export default AuthLayout;
