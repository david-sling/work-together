import io from "socket.io-client";
import { SOCKET_URL } from "../config";

const ENDPOINT = SOCKET_URL;
const socket = io(ENDPOINT);

export default socket;
