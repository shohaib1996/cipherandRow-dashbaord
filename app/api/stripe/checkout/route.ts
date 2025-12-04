import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function POST(req: Request) {
  try {
    // You can get the user ID from the session here if needed
    // const session = await getSession();
    // const userId = session?.user?.id;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Professional Plan",
              description: "Upgrade to the Professional Plan",
            },
            unit_amount: 9900, // $99.00 in cents
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        "origin"
      )}/dashboard/settings?success=true`,
      cancel_url: `${req.headers.get(
        "origin"
      )}/dashboard/settings?canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
