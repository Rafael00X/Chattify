export interface Timestamp {
  createdAt: string;
  updatedAt: string;
}

export enum ModelNames {
  CONVERSATION = "Conversation",
  MESSAGE = "Message",
  USER = "User",
}
