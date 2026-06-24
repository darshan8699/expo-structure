// Data — static/hardcoded data used for menus, fixtures, and mock UI

import type { User } from "../common/types";

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    createdAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "user",
    createdAt: "2024-03-22T10:00:00Z",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    role: "guest",
    createdAt: "2024-06-01T14:45:00Z",
  },
];
