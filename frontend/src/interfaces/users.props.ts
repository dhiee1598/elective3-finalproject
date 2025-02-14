export interface NewUsersProps {
  userId: string;
  name: string;
  email: string;
}

export interface UsersProps {
  userId: string;
  name: string;
  email: string;
  image_path: string;
  isAdmin: boolean;
}

export interface AuthUsersProps extends UsersProps {
  accessToken: string;
}
