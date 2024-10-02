import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }: { children: React.ReactNode }) {

  return (
    <UserContext.Provider value={{ }}>
      {children}
    </UserContext.Provider>
  );
}
