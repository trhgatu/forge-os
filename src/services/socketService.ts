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

  private lastToken: string | undefined;

  private getTokenFromStorage(): string | undefined {
    if (typeof window !== "undefined") {
      try {
        const storage = localStorage.getItem("forge-auth-storage");
        if (storage) {
          const parsed = JSON.parse(storage);
          return parsed.state?.token;
        }
      } catch (e) {
        console.warn("[SocketService] Failed to retrieve auth token", e);
      }
    }
    return undefined;
  }

  private getManager(): Manager {
    const token = this.getTokenFromStorage();

    // Force recreation if manager exists but was created without token and now we have one
    if (this.manager && !this.lastToken && token) {
      this.disconnectAll();
      this.manager = null;
    }

    if (!this.manager) {
      const url = this.getBaseUrl();
      this.lastToken = token;

      interface ManagerOptionsWithAuth {
        transports: string[];
        autoConnect: boolean;
        reconnection: boolean;
        auth?: {
          token?: string;
        };
        extraHeaders?: Record<string, string>;
      }

      const managerOptions: ManagerOptionsWithAuth = {
        transports: ["websocket"],
        autoConnect: true,
        reconnection: true,
        auth: {
          token: token ? `Bearer ${token}` : undefined,
        },
        extraHeaders: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.manager = new Manager(url, managerOptions as any);
    }
    return this.manager;
  }

  /**
   * Connects to a namespace.
   * @param namespace e.g. "/presence" or "/gamification"
   */
  public connect(namespace: string): Socket {
    const newToken = this.getTokenFromStorage();

    // Check for token change
    if (this.manager && newToken !== this.lastToken) {
      this.disconnectAll();
      this.manager = null;
    }

    if (!this.sockets.has(namespace)) {
      const manager = this.getManager();
      const token = this.getTokenFromStorage();

      // Pass auth to namespace socket (Manager-level auth doesn't propagate to namespaces)
      const socket = manager.socket(namespace, {
        auth: {
          token: token ? `Bearer ${token}` : undefined,
        },
      });

      socket.on("connect", () => {
        console.log(
          `[SocketService] Combined Connection Active for [${namespace}]. ID:`,
          socket.id
        );
      });

      socket.on("disconnect", () => {
        console.log(`[SocketService] Disconnected from [${namespace}]`);
      });

      socket.on("connect_error", (err) => {
        console.error(`[SocketService] Connection Error on [${namespace}]:`, err.message);
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
