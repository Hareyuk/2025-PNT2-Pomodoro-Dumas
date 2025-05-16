import { createContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [timeCounting, setTimeCounting] = useState(false);
  const [statusWork, setStatusWork] = useState("work"); // work, break
  const [resetTimer, setResetTimer] = useState(false);

  const toggleStatusWork = (newStatus) =>
  {
      if(newStatus != null)
      {
          setStatusWork(newStatus);
      }
      else if(statusWork === "work")
      {
          setStatusWork("break");
      }
      else
      {
          setStatusWork("work");
      }
      setResetTimer(true);
  }

  return (
    <GlobalContext.Provider value={{
        timeCounting, setTimeCounting,
        statusWork, toggleStatusWork,
        resetTimer, setResetTimer}}>
      {children}
    </GlobalContext.Provider>
  );
}