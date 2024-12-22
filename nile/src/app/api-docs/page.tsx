import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import React from "react";

const ApiDocs: React.FC = () => {
  console.log("get the swagger page");
  return <SwaggerUI url="/api/swagger.yaml" />;
  // return <SwaggerUI url="/swagger.json" />;
};

export default ApiDocs;