import React from "react";
import { Toaster } from "react-hot-toast";
import MyRouter from "./router/index";

function App() {
  const sharedStyles = {
    fontWeight: "600",
  };
  return (
    <div>
      <Toaster
        toastOptions={{
          success: {
            style: {
              border: "1px solid green",
              ...sharedStyles,
            },
          },
          error: {
            style: {
              minWidth: "450px",
              padding: "10px",
              border: "1px solid red",
              textAlign: "center",
              ...sharedStyles,
            },
          },
        }}
      />
      <MyRouter />
    </div>
  );
}

export default App;
