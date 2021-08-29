export const SOCKET_URL =
  process.env.NODE_ENV == "production"
    ? "https://work-together-socket.herokuapp.com/"
    : "http://localhost:8000";
