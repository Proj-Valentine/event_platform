import EventForm from '@/components/shared/EventForm';
import { auth } from '@clerk/nextjs';
import React from 'react';

const UpdateEvent = () => {
    const {sessionClaims} = auth();

    const userId = sessionClaims?.userId as string;
    
    return (
      <>
        <section>
          <h3> Update Event</h3>
        </section>
        <div>
          <EventForm userId={userId} type="Update" />
        </div>
      </>
    );
};

export default UpdateEvent;

