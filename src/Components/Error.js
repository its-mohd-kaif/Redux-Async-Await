import React from "react";

function Error(error) {
  // Error Component
  return (
    <div>
      <h1 style={{ fontSize: "40px", margin: "1em" }}>
        Something went wrong :/
      </h1>
      <p>{error.message}</p>
    </div>
  );
}

export default Error;
