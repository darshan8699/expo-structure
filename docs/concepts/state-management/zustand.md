# Zustand

Zustand is a small, fast, and scalable barebones state-management solution using simplified Hook patterns. It has a tiny footprint and solves common react state problems (such as zombie child problems, react concurrency, and context loss) without boilerplate.

---

## Dependencies
```bash
npm install zustand
```

---

## Implementation Steps
1. **Define Store**: Call `create()` to construct a state hook. Declare properties and update functions inside the hook closure.
2. **Access States**: Hook directly into components (e.g. `const bears = useBearStore(state => state.bears)`).
3. **Fire Updates**: Call update functions directly from the hook without providers.

---

## Zustand Data Flow Chart
```mermaid
graph TD
    subgraph Zustand Centralized Hook Store
        State[Bears State: 0]
        Action[increasePopulation function]
    end
    UI1[Component A: Bear Count] -->|useStore selector| State
    UI2[Component B: Add Button] -->|onPress event| Action
    Action -->|Updates| State
    State -->|Triggers re-render on| UI1
```

---

## Realistic Example: Global User Login Profile
```mermaid
sequenceDiagram
    participant UI as Profile Header
    participant Login as Login Screen Form
    participant Store as Zustand authStore Hook

    UI->>Store: Hook selector checks active user
    Note over UI: Renders "Guest Mode" button
    Login->>Store: Submits Form -> Calls loginUser(username, password)
    Note over Store: updates state { user: "Alice", isLoggedIn: true }
    Store->>UI: Auth State changes -> Header re-renders "Welcome, Alice"
```
