import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { IUser } from "../interface";

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null as IUser | null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/auth/profile");
        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!user?._id) {
      fetchUser();
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
