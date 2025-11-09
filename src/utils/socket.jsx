import io from 'socket.io-client';
import { BASE_URL } from './constants';

let socket = null;

export const createSocketConnection = () => {
    if (!socket || !socket.connected) {
        socket = io(BASE_URL, {
            withCredentials: true,
            transports: ['websocket', 'polling'] // Better for production
        });
    }
    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

