"use client";
import React, { useState } from "react";
import { FormatRegional } from "./useRegional";
import City from "./City";

const Prov = () => {
  const [lok, setLok] = useState<FormatRegional>();
  console.log(lok);
  return (
    <City
      value={lok}
      onChange={(value) => setLok(value as FormatRegional)}
    />
  );
};

export default Prov;
