import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
 
// this end point in our api will be called by clerk when a user is created, updated or deleted
// we need to configure the webhook in clerk dashboard to send the event to this endpoint
//  when events happens clerk will send an HTTP POST request to this endpoint(thats the parameter in the function)
//  the request will contain the event data in the body of the request
// the request will also contain the headers that we need to verify the request is coming from clerk and also contain the data we need.
// we will use the svix package to verify the request and get the data we need from the request and send the data ie write to our database
export async function POST(req: Request) {
 
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log(headerPayload)
  console.log(svix_id)
  console.log(svix_timestamp)

 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

//   console.log(body)
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

    // console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    // console.log('Webhook body:', body)
 
  if(eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    }

    const newUser = await createUser(user);


    // this is where we update the user metadata in clerk with user _id from the database to keep track of which user is which in clerk
    //  the newUser object is a mongodb document and has an auto generated  _id property that we can use to update the user metadata in clerk
    //  we use the clerkClient to update the user metadata in clerk.
    //  sample document in mongodb 
//     // { _id: 65909d0d8190d35916b410b8
//          clerkId: "user_2aHWT9Jo05qp5F4UqJix7TzjQtK"
//          email: "vkampah@mun.ca"
//          username: "vala"
//          firstName: "Valentine Kwame"
//          lastName: "Ampah"
//          photo: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdl…"
//          __v: 0  }
    if(newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id
        }
      })
    }

    // console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    // console.log('Webhook body:', body)

    return NextResponse.json({ message: 'User Created', user: newUser })
  }

  if (eventType === 'user.updated') {
    const {id, image_url, first_name, last_name, username } = evt.data

    const user = {
      firstName: first_name,
      lastName: last_name,
      username: username!,
      photo: image_url,
    }

    const updatedUser = await updateUser(id, user)

    return NextResponse.json({ message: 'User Updated', user: updatedUser })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    const deletedUser = await deleteUser(id!)

    return NextResponse.json({ message: 'User Deleted', user: deletedUser })
  }
 
  return new Response('', { status: 200 })
}
 






// // This is all copied from Clerk documentation inculding the folder structure

// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
// import { clerkClient } from '@clerk/nextjs'
// import { NextResponse } from 'next/server'
 
// export async function POST(req: Request) {
 
//   // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
//   if (!WEBHOOK_SECRET) {
//     throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
//   }
 
//   // Get the headers
//   const headerPayload = headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");
 
//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error occured -- no svix headers', {
//       status: 400
//     })
//   }
 
//   // Get the body
//   const payload = await req.json()
//   const body = JSON.stringify(payload);
 
//   // Create a new Svix instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET);
 
//   let evt: WebhookEvent
 
//   // Verify the payload with the headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Error verifying webhook:', err);
//     return new Response('Error occured', {
//       status: 400
//     })
//   }
 
//   // Get the ID and type
//   const { id } = evt.data;
//   const eventType = evt.type;
 
//   // Handle the event , apply any logic you need here
// //    clerk allows us to handle several events in the dashboard, ie users, emails, organizations etc
// //  the event payload will be different for each event type but mostly similar in structure
// //  we can use the event type to determine what to do with the event , the ayload conatins the entire event data
// //  and strutured as 
// //   "data": {
// //     // The event type specific payload will be here.
// //    firstname: 'John',
// //    lastname: 'Doe',
// //    email: 'johndoe@examplecom',
// //   },
// //   "object": "event", // will always be event
// //   "type": "<event>" // user.created, user.updated, user.deleted, email.sent, email.opened, email.clicked,seesion.ended, organization.created, organization.updated, organization.deleted
// // }


// // create a user objet from the event payload and send to our database when a user is created in clerk
//   if (eventType === 'user.created') {

//       //    the naming of the variables are as a result of how the data is structured in the payload, eg first_name, not fristName
//     //    const { id, emailAddress, firstName, lastName, photo,username} = evt.data;
//     // the destructuring depends on how the payload looks like
//    const { id, email_addresses, first_name, last_name, image_url, username} = evt.data;
//    const user = { 
//     clerkId:id,
//     email:email_addresses[0].email_address,
//     username:username!,
//     firstName:first_name,
//     lastName:last_name,
//     photo:image_url,
//    }

// //    creating  a user in our database wit the createUser function from user.actions that connect to the database and create the clerk user

//    const newUser = await createUser(user);

//    console.log (newUser)

//    if (newUser) {
//     await clerkClient.users.updateUserMetadata(id, {
//         publicMetadata: {
//             userId: newUser._id,
//             },
//         })
//    }

//    return NextResponse.json({message: 'OK', user: newUser})
//   }

//   if (eventType === 'user.updated') {
//     const {id, image_url, first_name, last_name, username } = evt.data

//     const user = {
//       firstName: first_name,
//       lastName: last_name,
//       username: username!,
//       photo: image_url,
//     }

//     const updatedUser = await updateUser(id, user)

//     return NextResponse.json({ message: 'OK', user: updatedUser })
//   }

//   if (eventType === 'user.deleted') {
//     const { id } = evt.data

//     const deletedUser = await deleteUser(id!)

//     return NextResponse.json({ message: 'OK', user: deletedUser })
//   }


// //   console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
// //   console.log('Webhook body:', body)
 
//   return new Response('', { status: 200 })
// }
 