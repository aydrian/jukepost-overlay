import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  console.log("Test Session:", session);
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <img src={session.user.image} alt={session.user.name} />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
