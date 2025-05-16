import { createContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [timeCounting, setTimeCounting] = useState(false);
  const [statusWork, setStatusWork] = useState("work"); // work, break
  const [resetTimer, setResetTimer] = useState(false);
  return (
    <GlobalContext.Provider value={{
        timeCounting, setTimeCounting,
        statusWork, setStatusWork,
        resetTimer, setResetTimer}}>
      {children}
    </GlobalContext.Provider>
  );
}