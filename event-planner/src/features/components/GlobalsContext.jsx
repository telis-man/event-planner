import React, { useContext, useState } from "react";
export const GlobalsContext = React.createContext();
export const GlobalsUpdateContext = React.createContext();

export function useUserId() {
  return useContext(GlobalsContext);
}

export function useUserIdUpdate() {
  return useContext(GlobalsUpdateContext);
}

export function GlobalsProvider({ children }) {
  const [editUserId, setEditUserId] = useState(null);
  const updateUserId = (id) => {
    setEditUserId(id);
    console.log(id);
  };

  return (
    <GlobalsContext.Provider value={editUserId}>
      <GlobalsUpdateContext.Provider value={updateUserId}>
        {children}
      </GlobalsUpdateContext.Provider>
    </GlobalsContext.Provider>
  );
}
