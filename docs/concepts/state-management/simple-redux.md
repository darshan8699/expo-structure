# Simple Redux

Simple (or Classic) Redux is a predictable state container for JavaScript apps. It uses a single global store, actions, and pure functions called reducers to update the state.

---

## Dependencies
```bash
npm install redux react-redux
```

---

## Implementation Steps
1. **Define Types & Actions**: Set constant string types and create action objects.
2. **Create a Reducer**: Build a pure function that calculates new state based on action types.
3. **Configure the Store**: Instantiate `createStore(reducer)`.
4. **Link to React**: Wrap your root component in `<Provider store={store}>` and use `useSelector` (to read state) and `useDispatch` (to dispatch actions).

---

## Architectural Data Flow (Concept Chart)
```mermaid
graph LR
    subgraph React UI Layer
        UI[React Component] -->|1. useDispatch| Dispatch[dispatch action]
    end
    subgraph Redux Engine
        Dispatch -->|2. Intercepts action| Reducer[Pure Reducer Function]
        Reducer -->|3. Computes new state| Store[Global State Store]
        Store -->|4. Triggers update| Selector[useSelector hook]
    end
    Selector -->|5. Re-renders UI| UI
```

---

## Realistic Example: Shopping Cart Update
```mermaid
sequenceDiagram
    participant UI as Cart Screen
    participant Action as Action: ADD_TO_CART
    participant Reducer as Cart Reducer
    participant Store as State Store

    UI->>Action: Taps "Add Item" (payload: { id: 101, qty: 1 })
    Action->>Reducer: Dispatch ADD_TO_CART
    Note over Reducer: checks if item exists.<br/>Increments qty if yes,<br/>adds new item if no.
    Reducer->>Store: Return copy of state with updated cart items
    Store->>UI: State changes, cart count updates to 1 item
```
