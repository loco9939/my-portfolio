import { User } from "@/utils/getUser";
import React from "react";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
