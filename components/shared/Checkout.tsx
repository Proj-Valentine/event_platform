import React, { useEffect } from 'react'
// copied from stripe docs https://stripe.com/docs/checkout/quickstart?lang=node&client=next
import { loadStripe } from '@stripe/stripe-js';

import { IEvent } from '@/lib/database/models/event.model';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';
// import { checkoutOrder } from '@/lib/actions/order.actions';

//  copied from stripe docs https://stripe.com/docs/checkout/quickstart?lang=node&client=next create a stripe promise and add  .env file
// # https://dashboard.stripe.com/apikeys
// # Set this environment variable to support webhooks — https://stripe.com/docs/webhooks#verify-events
// # STRIPE_WEBHOOK_SECRET=whsec_12345
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
  // useEffect copied from stripe docs https://stripe.com/docs/checkout/quickstart?lang=node&client=next
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async () => {
    // console.log('checkout')
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    }

    await checkoutOrder(order);
  }

  return (
    <form action={onCheckout} method="post">
      <Button
        type="submit"
        role="link"
        size="lg"
        className="button sm:w-fit dark:text-white"
      >
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
}

export default Checkout