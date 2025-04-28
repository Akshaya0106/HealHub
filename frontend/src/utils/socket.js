import { io } from "socket.io-client";

const SOCKET_URL = "https://healhub-5by5.onrender.com"; // Update with your backend URL
export const socket = io(SOCKET_URL, { autoConnect: false });
