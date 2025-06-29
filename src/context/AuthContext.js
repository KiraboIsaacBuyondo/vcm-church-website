import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase'; // Import from our new firebase.js

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid);
      } else {
        // If no user, sign in anonymously for basic access
        try {
          const anonUser = await signInAnonymously(auth);
          setUser(anonUser.user);
          setUserId(anonUser.user.uid);
        } catch (error) {
          console.error("Anonymous sign-in failed:", error);
          setUser(null);
          setUserId(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userId,
    isLoggedIn: user && !user.isAnonymous, // A helper to know if it's a real user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}