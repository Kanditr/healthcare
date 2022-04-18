import { API, Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import React from "react";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  async function callApi() {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    console.log({ token });

    const requestInfo = {
      headers: {
        Authorization: token,
      },
    };

    const data = await API.get("reactrestauthapi", "/hello", requestInfo);
    console.log({ data });
  }
  return (
    <div>
      <h1>Hello {user.username}</h1>
      <button onClick={callApi}>Call API</button>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default withAuthenticator(App);
