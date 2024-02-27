import { createContext, useContext, useState } from "react";

const context = createContext();
const contextUse = () => {
  return useContext(context);
};
const ContextProvider = (props) => {
  //states
  const [userName, setuserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  //
  return (
    <context.Provider
      value={{
        userName,
        setuserName,
        email,
        setFullName,
        setEmail,
        fullName,
        password,
        setPassword,
        resetPassword,
        setResetPassword,
      }}
    >
      {props.children}
    </context.Provider>
  );
};
export { context, contextUse, ContextProvider };
