import { create } from "zustand";
import { UsersProps } from "@/interfaces/users.props";

interface UserStoreState {
  users: UsersProps | null;
  setUsers: (users: UsersProps) => void;
  clearUsers: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  users: null,
  setUsers: (users) => set({ users }),
  clearUsers: () => set({ users: null }),
}));
