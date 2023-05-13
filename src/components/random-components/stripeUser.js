import { createContext, useState, useEffect, useContext } from "react";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";
import {Session} from '@supabase/supabase-js'
import axios from "axios";

const Context = createContext();

const Provider = ({ children }) => {
  const supabase = useSupabaseClient();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null)
  const router = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({
          ...sessionUser,
          ...profile,
        });

        setIsLoading(false);
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, [supabase]);

  // useEffect(() => {
  //   const userSession = async () => {
  //     const data = await supabase.auth.getSession()
  //     setSession(data.data.session)
  //   }
  //   userSession()
  // }, [supabase])

  // console.log(session)

  // useEffect(() => {
  //   axios.post("/api/set-supabase-cookie", {
  //     event: user ? "SIGNED_IN" : "SIGNED_OUT",
  //     session: session,
  //   });
  // }, [user, session]);

  const login = async () => {
    await supabase.auth.signIn({
      provider: "github",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const exposed = {
    user,
    login,
    logout,
    isLoading,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};
// eslint-disable-next-line react-hooks/rules-of-hooks
export const stripeUser = () => useContext(Context);

export default Provider;