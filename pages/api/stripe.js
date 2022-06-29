import React from "react";
import Stripe from 'stripe';


const stripe = new Stripe("sk_test_51LFqpWSHUhNMYk164fAxPcI24bQ0pnE8FjQx4U1rffUt2nH2DY7geER4ZW8LB6TAZgf6ICo59Mlm2s1SPX1L73We00AT323JKV");

export default async function handler(req, res) {
    if (req.method == "POST") {
        try {
            const params = {
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ["card"],
                billing_address_collection: "auto",
                shipping_options: [
                    { shipping_rate: "shr_1LFrBlSHUhNMYk16aPAu3iuE" }
                ],
                line_items: req.body.map((item) => {
                    const img = item.image;
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

                    return {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.qty
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/error`
            }

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