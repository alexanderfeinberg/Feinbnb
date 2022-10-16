import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [defaultValue, setDefaultValue] = useState(false);

  return (
    <>
      <MenuContext.Provider
        value={{ showModal, setShowModal, defaultValue, setDefaultValue }}
      >
        {children}
      </MenuContext.Provider>
    </>
  );
}
