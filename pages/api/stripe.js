//api folder serves as the backend of the application (server)
//don't need Node/Express server, can do all in api folder

import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
//each file needs to have it's own handler
export default async function handler(req, res) {
   //handles post request to Stripe 
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',

        shipping_options: [{ shipping_rate: 'shr_1M2S9bLEodn3uNw872FcQ23X' }, 
                            {shipping_rate: 'shr_1M2S8WLEodn3uNw8pZ5zhkGP'}],
        //loop through cartItems sent from Cart.jsx
        line_items: req.body.map((item) => {
          //this is only a reference to image on Sanity so we need to replace it
          const img = item.image[0].asset._ref;
          //replace to actual url pointing to image from Sanity
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/igqz8u7v/production/').replace('-webp', '.webp');

          //returns object that represents one of the items 
          return {
            price_data: { 
              currency: 'CAD',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              //needs to be in cents so * 100
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancelled`,
      }

      //create Checkout Sessions from body params
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}