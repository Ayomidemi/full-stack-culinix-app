import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { IUser } from "../interface";

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  token: string | null;
}

export const UserContext = createContext<IUserContext>({
  token: null,
  user: null,
  setUser: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null as IUser | null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const tokenFromCookie = Cookies.get("token");

    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenFromCookie}`;
    }

    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/auth/profile");
        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!user) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token }}>
      {children}
    </UserContext.Provider>
  );
}
