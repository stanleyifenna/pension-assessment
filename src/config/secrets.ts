const baseURL: string | undefined = process.env.REACT_APP_BASE_URL;

if (!baseURL) {
  console.warn("REACT_APP_BASE_URL is not defined in the environment variables.");
}

const config = { baseURL };

export default config;
