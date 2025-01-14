export const storage = {
  get: (key) => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error(`Error getting ${key} from localStorage:`, error);
        return null;
      }
    }
    return null;
  },
  set: (key, value) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting ${key} in localStorage:`, error);
      }
    }
  },
  remove: (key) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
      }
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.clear();
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    }
  },
};
