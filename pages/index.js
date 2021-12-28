import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("Test Session:", session);

  if (session) {
    return (
      <Layout>
        <img
          src={session.user.image}
          alt={session.user.name}
          className="rounded-full"
        />
        <h2 className="text-xl font-bold">Welcome, {session.user.name}</h2>
        <code>
          https://juke-overlay.netlify.app/now-playing/
          {session.providerAccountId}/
        </code>
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </Layout>
    );
  }
  return (
    <Layout>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </Layout>
  );
}

function Layout({ children }) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Jukepost</h1>
      {children}
    </div>
  );
}
