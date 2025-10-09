import type React from "react";
import { Input } from "./Input";

export const Form: React.FC = () => {
  return (
    <>
      <form action="">
        <Input type="text" label="Name" />
        <Input type="text" label="City"/>
        <Input type="text" label="Skills"/>
      </form>
    </>
  );
};
