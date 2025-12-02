export interface Message {
  id: string
  from: string
  to: string
  text: string
  timestamp: string
}

export interface ConnectedUser {
  username: string
  status: "online" | "offline"
  connectedAt: string | null
  disconnectedAt: string | null
  lastSeen: string
}

const STORAGE_KEYS = {
  MESSAGES: "la_guitarrita_messages",
  USERS: "la_guitarrita_users",
  LAST_UPDATE: "la_guitarrita_last_update",
}

export class ChatSync {
  private static instance: ChatSync
  private listeners: Set<() => void> = new Set()

  private constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.handleStorageChange.bind(this))
    }
  }

  static getInstance(): ChatSync {
    if (!ChatSync.instance) {
      ChatSync.instance = new ChatSync()
    }
    return ChatSync.instance
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === STORAGE_KEYS.MESSAGES || event.key === STORAGE_KEYS.USERS) {
      this.notifyListeners()
    }
  }

  subscribe(callback: () => void) {
    this.listeners.add(callback)
    return () => {
      this.listeners.delete(callback)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((callback) => callback())
  }

  // Messages
  getMessages(): Message[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    return data ? JSON.parse(data) : []
  }

  addMessage(message: Message) {
    const messages = this.getMessages()
    messages.push(message)
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
    localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString())
    this.notifyListeners()
  }

  // Users
  getUsers(): ConnectedUser[] {
    if (typeof window === "undefined") {
      return [
        { username: "admin", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
        { username: "operaciones", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
        { username: "dirección", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
        { username: "euskal", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
        { username: "nuñez", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
      ]
    }

    const data = localStorage.getItem(STORAGE_KEYS.USERS)
    if (!data) {
      const defaultUsers: ConnectedUser[] = [
        { username: "admin", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
        { username: "operaciones", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
        { username: "dirección", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
        { username: "euskal", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
        { username: "nuñez", status: "offline", connectedAt: null, disconnectedAt: null, lastSeen: "Offline" },
      ]
      this.updateUsers(defaultUsers)
      return defaultUsers
    }
    return JSON.parse(data)
  }

  updateUsers(users: ConnectedUser[]) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString())
    this.notifyListeners()
  }

  updateUserStatus(username: string, updates: Partial<ConnectedUser>) {
    const users = this.getUsers()
    const updatedUsers = users.map((user) => (user.username === username ? { ...user, ...updates } : user))
    this.updateUsers(updatedUsers)
  }

  clearAll() {
    localStorage.removeItem(STORAGE_KEYS.MESSAGES)
    localStorage.removeItem(STORAGE_KEYS.USERS)
    localStorage.removeItem(STORAGE_KEYS.LAST_UPDATE)
    this.notifyListeners()
  }
}
