const storage = {
    add: (key: string, item: string) => localStorage.setItem(key, item),
  
    fetch: (key: string): string | null => localStorage.getItem(key),
  
    remove: (key: string) => localStorage.removeItem(key),
  
    clear: () => localStorage.clear(),
  };
  
  export default storage;
  