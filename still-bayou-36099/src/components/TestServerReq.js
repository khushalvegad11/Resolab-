import axios from "axios";
import React, { useEffect } from "react";
const https = require("https");

function TestServerReq() {
  useEffect(() => {
    // let url = "https://api.resolabindia.com/core/list_providers_people_all/"; // heroku
    let url = "https://www.resolabindia.com/api/core/list_providers_people_all/"; // aws

    // At instance level
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    instance.get(url).then(res => {
      console.log("res >> ", res);
    }).catch(err => {
      console.log("err >> ", err);
    });

    return () => {
      // cleanup;
    };
  }, []);

  return (
    <div>
      <h1>TestServerReq</h1>
    </div>
  );
}

export default TestServerReq;
