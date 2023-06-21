import { createContext, useState, useEffect, useContext } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const Context = createContext();

const Provider = ({ children }) => {
  const supabase = useSupabaseClient();
  const supabaseUser = useUser()
  const [user, setUser] = useState(supabaseUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {

      if (supabaseUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", supabaseUser.id)
          .single();

        setUser({
          ...supabaseUser,
          ...profile,
        });

        setLoading(false);
      };
    } 

    getUserProfile();

    // supabase.auth.onAuthStateChange(() => {
    //   getUserProfile();
    // });
  }, [ supabase, supabaseUser]);

  console.log({providerUser: user})
  const exposed = {
    user,
    loading,
    supabase
  };

  return (
    <Context.Provider value={exposed}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);

export default Provider;