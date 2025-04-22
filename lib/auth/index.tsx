'use client';

import { createContext, useContext, ReactNode } from 'react';
import { User, Team } from '@/lib/db/schema';

type UserWithTeam = User & {
  team?: {
    planName: string | null;
  };
};

type UserContextType = {
  userPromise: Promise<UserWithTeam | null>;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({
  children,
  userPromise
}: {
  children: ReactNode;
  userPromise: Promise<UserWithTeam | null>;
}) {
  return (
    <UserContext.Provider value={{ userPromise }}>
      {children}
    </UserContext.Provider>
  );
}
