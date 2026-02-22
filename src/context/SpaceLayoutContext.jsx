import { createContext, useContext, useState, useCallback } from 'react';
import { SECTIONS } from '../data/sections';

const SpaceLayoutContext = createContext(null);

export function SpaceLayoutProvider({ children }) {
  const [activeDetailId, setActiveDetailId] = useState(null);

  const openDetail = useCallback((sectionId) => setActiveDetailId(sectionId), []);
  const closeDetail = useCallback(() => setActiveDetailId(null), []);

  const value = {
    activeDetailId,
    openDetail,
    closeDetail,
    sections: SECTIONS,
  };

  return (
    <SpaceLayoutContext.Provider value={value}>
      {children}
    </SpaceLayoutContext.Provider>
  );
}

export function useSpaceLayout() {
  const ctx = useContext(SpaceLayoutContext);
  if (!ctx) throw new Error('useSpaceLayout must be used within SpaceLayoutProvider');
  return ctx;
}
