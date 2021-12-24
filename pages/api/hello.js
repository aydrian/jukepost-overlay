// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    console.log("Hello Session", session);
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in."
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page."
    });
  }
};
