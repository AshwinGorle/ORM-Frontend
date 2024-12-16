// Create a simple API configuration manager
const API_CONFIG = {
  currentServer: 'deployed',
  servers: {
    local: process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://localhost:5000/api/v1",
    deployed: process.env.NEXT_PUBLIC_DEPLOYED_API_URL || "https://oms-api.vercel.app/api/v1"
  }
};

export const getBaseUrl = () => API_CONFIG.servers[API_CONFIG.currentServer];
export const getCurrentServer = () => API_CONFIG.currentServer;
export const setCurrentServer = (server) => {
  API_CONFIG.currentServer = server;
}; 