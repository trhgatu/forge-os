import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(url: string) {
    if (!this.socket) {
      this.socket = io(url, {
        transports: ["websocket"],
        autoConnect: true,
        reconnection: true,
      });

      this.socket.on("connect", () => {
        console.log("Connected to Presence Gateway:", this.socket?.id);
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from Presence Gateway");
      });
    }
    return this.socket;
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = SocketService.getInstance();
