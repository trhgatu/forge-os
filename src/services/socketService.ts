import { Socket, Manager } from "socket.io-client";

class SocketService {
  private manager: Manager | null = null;
  private sockets: Map<string, Socket> = new Map();
  private static instance: SocketService;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  private getBaseUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    try {
      const url = new URL(apiUrl);
      return url.origin; // e.g. http://localhost:8000
    } catch {
      return apiUrl;
    }
  }

  private getManager(): Manager {
    if (!this.manager) {
      const url = this.getBaseUrl();
      this.manager = new Manager(url, {
        transports: ["websocket"],
        autoConnect: true,
        reconnection: true,
      });
      console.log(`[SocketService] Initialized Manager at ${url}`);
    }
    return this.manager;
  }

  /**
   * Connects to a namespace.
   * @param namespace e.g. "/presence" or "/gamification"
   */
  public connect(namespace: string): Socket {
    if (!this.sockets.has(namespace)) {
      const manager = this.getManager();
      const socket = manager.socket(namespace);

      socket.on("connect", () => {
        console.log(
          `[SocketService] Combined Connection Active for [${namespace}]. ID:`,
          socket.id
        );
      });

      socket.on("disconnect", () => {
        console.log(`[SocketService] Disconnected from [${namespace}]`);
      });

      this.sockets.set(namespace, socket);
      return socket;
    }
    return this.sockets.get(namespace)!;
  }

  public getSocket(namespace: string): Socket | null {
    return this.sockets.get(namespace) || null;
  }

  public disconnect(namespace: string) {
    const socket = this.sockets.get(namespace);
    if (socket) {
      socket.disconnect();
      this.sockets.delete(namespace);
    }
  }

  public disconnectAll() {
    this.sockets.forEach((socket) => socket.disconnect());
    this.sockets.clear();
    // Also close manager if needed, usually we keep it open
  }
}

export const socketService = SocketService.getInstance();
