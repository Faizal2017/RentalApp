"use client";

import { createContext, useContext, useState } from "react";

//create a context
const GlobalContext = createContext();

//create a provider
export function GlobalProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <GlobalContext.Provider value={{ count, setCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

//create a custom hook to use the context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
