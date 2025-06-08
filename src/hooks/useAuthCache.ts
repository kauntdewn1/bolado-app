import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

const CACHE_KEY = 'auth_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

interface CacheData {
  user: User | null;
  timestamp: number;
}

export const useAuthCache = () => {
  const [cachedUser, setCachedUser] = useState<User | null>(null);

  const saveToCache = (user: User | null) => {
    const cacheData: CacheData = {
      user,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    setCachedUser(user);
  };

  const getFromCache = (): User | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { user, timestamp }: CacheData = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

      if (isExpired) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return user;
    } catch (error) {
      console.error('Erro ao recuperar cache de autenticação:', error);
      return null;
    }
  };

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    setCachedUser(null);
  };

  useEffect(() => {
    const cached = getFromCache();
    if (cached) {
      setCachedUser(cached);
    }
  }, []);

  return {
    cachedUser,
    saveToCache,
    clearCache,
  };
}; 