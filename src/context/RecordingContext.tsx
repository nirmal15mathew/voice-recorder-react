import React, { createContext, useContext, useState } from 'react';

interface Recording {
  url: string;
  createdAt: Date;
  name: string;
}


interface RecordingContextProps {
  recordings: Recording[];
  addRecording: (url: string, name: string) => void;
  removeRecording: (url: string) => void;
}

export type {
  Recording
}



const RecordingContext = createContext<RecordingContextProps | null>(null);

export const RecordingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  const addRecording = (url: string, name: string) => {
    setRecordings((prev) => [...prev, { url, createdAt: new Date(), name }]);
  };

  const removeRecording = (url: string) => {
    setRecordings((prev) => prev.filter((r) => r.url !== url));
  };


  return (
    <RecordingContext.Provider value={{ recordings, addRecording, removeRecording }}>
      {children}
    </RecordingContext.Provider>
  );
};

export const useRecordingContext = () => {
  const ctx = useContext(RecordingContext);
  if (!ctx) throw new Error("useRecordingContext must be used within Provider");
  return ctx;
};
