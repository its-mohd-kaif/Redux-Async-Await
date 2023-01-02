import { Frame, Loading } from "@shopify/polaris";
import React from "react";

function Loader() {
  // Loader Component
  return (
    <div style={{ height: "50px" }}>
      <Frame>
        <Loading />
      </Frame>
    </div>
  );
}

export default Loader;
