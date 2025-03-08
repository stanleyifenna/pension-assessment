import storage from "./storage";
//I will use jwt decoder here if the pension system using encryption

const auth = {
  isAuthenticated: (): boolean => {
    const token = storage.fetch("token");
    if (token) {
      const decoded = (token.slice(6));
      if (decoded && typeof decoded === "object" && "exp" in decoded) {
        const { exp } = decoded as { exp: number };
        if (Date.now() <= exp * 1000) {
          return true;
        }
      }
      storage.clear();
    }
    return false;
  },
};

export default auth;
