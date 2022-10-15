import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <MenuContext.Provider value={{ showModal, setShowModal }}>
        {children}
      </MenuContext.Provider>
    </>
  );
}
