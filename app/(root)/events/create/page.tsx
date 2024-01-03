// import EventForm from '@/components/shared/EventForm';
import EventForm from '@/components/shared/EventForm';
import { auth } from '@clerk/nextjs';
import React from 'react';

const CreateEvent = () => {

    // retrieve the user id from clerk from the session claims , by customizing values you need under customize session tokens in clerk dashboard, 
    //  for seion claims you define variables or data you need from the user session and use those values
    const {sessionClaims} = auth();

    // this is the user id retrieved from clerk which is the same as the user id in our database an used as the public meta data in clerk
    const userId = sessionClaims?.userId as string;
    // console.log(userId)

    return (
        <>
        <section className="mb-2">
            <h2 className="text-lg font-semibold"> Create Event</h2>
        </section>
        <div>
            <EventForm userId={userId} type="Create"/>
        </div>
        </>
    );
};

export default CreateEvent;

