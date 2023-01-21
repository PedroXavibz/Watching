import { signOut, useSession } from 'next-auth/react';
import PageHead from '@/components/PageHead';

const Room = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <PageHead title='Watching Room' />
        <div>
          <p>
            Welcome {session.user?.name}, room page
          </p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <PageHead title='Watching Room' />
        <div>
          <p>Not signed in</p>
        </div>
      </>
    );
  }

};

export default Room;
