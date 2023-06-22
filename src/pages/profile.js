import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUser, useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import FullCharacterSheet from "../components/character-sheet/fullCharacterSheet.js";
import { useUserContext } from "../../context/user";
import MonsterCard from "../components/random-encounter/monster-cards.js";

const Profile = () => {
  const session = useSessionContext();
  const {user} = useUserContext();

  const router = useRouter();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(true);
  const [pcs, setPcs] = useState();
  const [pc, setPc] = useState();
  const [encounters, setEncounters] = useState();
  const [encounter, setEncounter] = useState();
  const [toggledButtonId, setToggledButtonId] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (user) {
        const { data: pcs, error: err } = await supabase
          .from("pc_characters")
          .select("*")
          .eq("id", user.id);

        setPcs(pcs);

        const {data: userEncounters, error: err2} = await supabase
          .from("monster_encounters")
          .select("*")
          .eq("user_id", user.id);

        setEncounters(userEncounters);
      }
    };
    fetchData();
    setLoading(false);
  }, [supabase, user]);

  const loadPortal = async () => {
    const { data } = await axios.get("/api/portal");
    router.push(data.url);
  };

  const handlePc = async (pc) => {
    const { data: pcs, error } = await supabase
      .from('pc_characters')
      .select(('*'))
      .eq('id', user.id)
      .eq('pc_name', pc)
      
      setPc(pcs[0])
  }

  const handleEncounter = async (selectedEncounter) => {
    const { data: singleEncounter, error } = await supabase
      .from('monster_encounters')
      .select(('*'))
      .eq('user_id', user.id)
      .eq('encounter_name', selectedEncounter)

      setEncounter(singleEncounter[0])
  }

  const authView = session.isLoading = false

  return (
    <div className="min-h-screen">
      {!session.isLoading && (
        <div className="mt-8">
          {authView ? (
            <div className="p-4">
              <Auth
                redirectTo={`${process.env.CLIENT_URL}/profile`}
                appearance={{ theme: ThemeSupa }}
                supabaseClient={supabase}
                providers={["google"]}
                socialLayout="horizontal"
              />
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 text-center m-4 space-x-4">
                <div className="grid grid-cols-1">
                  <h1 className="text-2xl">
                    {user?.email ? (
                      <div className="grid justify-items-center">
                        {user?.email}
                      </div>
                    ) : (
                      <div className="grid justify-items-center">
                        {user?.user_metadata.email}
                      </div>
                    )}
                  </h1>
                  <div className="grid grid-cols-1 justify-items-center space-y-2">
                    <button 
                      className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                      id="pc"
                      onClick={(e) => setToggledButtonId(e.target.id)}
                    >
                      Saved PC&apos;s
                    </button>
                    <button 
                      className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                      id="npc"
                      onClick={(e) => setToggledButtonId(e.target.id)}
                    >
                      Saved NPC&apos;s
                    </button>
                    <button 
                      className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                      id="encounter"
                      onClick={(e) => setToggledButtonId(e.target.id)}
                    >
                      Saved Encounters
                    </button>
                    <button 
                      className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                      id="campaign"
                      onClick={(e) => setToggledButtonId(e.target.id)}
                    >
                      Saved Campaigns
                    </button>
                  </div>
                </div>
                <div className="w-full h-full justify-self-center">
                  <Image
                    alt="site logo"
                    src="/images/logos/white-logo.svg"
                    width={300}
                    height={300}
                  />
                  <div className="mt-8 space-y-2">
                    {user?.is_subscribed ? (
                      <div className="text-center space-y-2">
                        <p>Subscription Status: {user?.interval}</p>
                        <button
                          className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                          onClick={loadPortal}
                        >
                          Manage Subscription
                        </button>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <p>Subscription Status: Not Subscribed</p>
                        <button
                          className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                        >
                          <Link href="/pricing" >Click to go to pricing</Link>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {!user?.is_subscribed && (
                <div className="grid justify-items-center">
                  <p className="w-1/2 text-center p-2">Even if you aren&apos;t subscribed, everything is still being saved. Subscribe to view all of your saved items.</p>
                </div>
              )}

                {toggledButtonId === "pc" && (
                  <div className="grid">
                    <div className="flex gap-4 justify-center">
                      {user?.is_subscribed ? (
                        pcs?.map((pc) => (
                          <ul key={pc.pc_name}>
                            <button
                              className="bg-defaultButton rounded-md p-2 justify-self-center"
                              value={pc.pc_name}
                              onClick={(e) => {handlePc(e.target.value)}}
                            >
                              {pc.pc_name}
                            </button>
                          </ul>
                        ))
                      ) : (
                        pcs?.slice(0,2).map((pc) => (
                          <ul key={pc.pc_name}>
                            <button
                              className="bg-defaultButton rounded-md p-2 justify-self-center"
                              value={pc.pc_name}
                              onClick={(e) => {handlePc(e.target.value)}}
                            >
                              {pc.pc_name}
                            </button>
                          </ul>
                        ))
                      )}
                    </div>
                    {!pc ? (
                      <div />
                    ) : (
                      <div className="grid justify-items-center">
                        <FullCharacterSheet key={pc.pc_name} currentPc={pc} pc_id={pc.pc_id} />
                      </div>
                    )}
                  </div>
                )}
                
                {toggledButtonId === "npc" && (
                  <div className="flex gap-4 justify-center">
                    Saving npc&apos;s is a feature that is coming soon!
                  </div>
                )}
                {toggledButtonId === "encounter" && (
                  <div className="flex gap-4 justify-center">
                    <div className="grid">
                      <div className="flex gap-4 justify-center">
                        {user?.is_subscribed ? (
                          encounters?.map((encounter) => (
                            <ul key={encounter.encounter_name}>
                              <button
                                className="bg-defaultButton rounded-md p-2 justify-self-center"
                                value={encounter.encounter_name}
                                onClick={(e) => {handleEncounter(e.target.value)}}
                              >
                                {encounter.encounter_name}
                              </button>
                            </ul>
                          ))
                        ) : (
                          encounters?.slice(0,2).map((encounter) => (
                            <ul key={encounter.encounter_name}>
                              <button
                                className="bg-defaultButton rounded-md p-2 justify-self-center"
                                value={encounter.encounter_name}
                                onClick={(e) => {handleEncounter(e.target.value)}}
                              >
                                {encounter.encounter_name}
                              </button>
                            </ul>
                          ))
                        )}
                      </div>
                      {!encounter ? (
                        <div />
                      ) : (
                        <div className="grid">
                          <h2 className="text-center text-3xl font-bold m-4">{encounter.encounter_name}</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-2">
                            {encounter.encounter.map((monster, index) => (
                              <MonsterCard monsters={monster} key={index} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {toggledButtonId === "campaign" && (
                  <div className="flex gap-4 justify-center">
                    Saving campaign&apos;s is a feature that is coming soon!
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
