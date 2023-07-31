import React, { useContext, useState } from "react";
export const GlobalsContext = React.createContext();
export const GlobalsUpdateContext = React.createContext();

export function useGlobals() {
  return useContext(GlobalsContext);
}

export function useGlobalsUpdate() {
  return useContext(GlobalsUpdateContext);
}

export function GlobalsProvider({ children }) {
  const [editUserId, setEditUserId] = useState(null);
  const updateUserId = (id) => {
    setEditUserId(id);
  };

  return (
    <GlobalsContext.Provider value={editUserId}>
      <GlobalsUpdateContext.Provider value={updateUserId}>
        {children}
      </GlobalsUpdateContext.Provider>
    </GlobalsContext.Provider>
  );
}
