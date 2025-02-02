export interface NewUsersProps {
  userId: string;
  name: string;
  email: string;
}

export interface UsersProps {
  users: {
    userId: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

export interface AuthUsersProps extends UsersProps {
  accessToken: string;
}
