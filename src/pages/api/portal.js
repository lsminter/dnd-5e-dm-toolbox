import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import initStripe from "stripe";

const handler = async (req, res) => {
  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: {user} 
  } = await supabase.auth.getUser();

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const { data: { stripe_customer} } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_customer,
    return_url: `http://localhost:3001/profile`,
  })

  res.send({
    url: session.url
  })
}

export default handler;