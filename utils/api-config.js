// Create a simple API configuration manager
const API_CONFIG = {
  currentServer: 'deployed',
  servers: {
    local: "http://localhost:5000/api/v1",
    deployed: "https://oms-api.vercel.app/api/v1"
  }
};

export const getBaseUrl = () => API_CONFIG.servers[API_CONFIG.currentServer];
export const getCurrentServer = () => API_CONFIG.currentServer;
export const setCurrentServer = (server) => {
  API_CONFIG.currentServer = server;
}; 