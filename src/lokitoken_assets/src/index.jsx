import ReactDOM from 'react-dom';
import React from 'react';
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  // Add authentication process
  const authClient = await AuthClient.create();

  // Check to see if have already been authenticated
  if (await authClient.isAuthenticated()) {
    // Run main app once authenticated
    handleAuthenticated(authClient);
  } else {
    // If not already authenticated
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        // Run main app once authenticated
        handleAuthenticated(authClient);
      }
    });
  }
}

// Create function to run main app once authenticated
async function handleAuthenticated(authClient) {
  // Run main app once authenticated
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();



