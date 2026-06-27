# Redux Thunk

Redux Thunk is a middleware that allows you to write action creators that return a function (a thunk) instead of a plain action object. This function can perform asynchronous tasks (e.g. API requests) and dispatch standard actions when complete.

---

## Dependencies
RTK includes Redux Thunk by default. For legacy Redux:
```bash
npm install redux-thunk
```

---

## Configuration
If using RTK, no configuration is needed. For legacy Redux, apply middleware:
```typescript
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
const store = createStore(reducer, applyMiddleware(thunk));
```

---

## Implementation Steps
1. **Declare Thunk Action**: Define an action creator using `createAsyncThunk()` (RTK) that performs async fetching.
2. **Handle States in Reducers**: Map `pending`, `fulfilled`, and `rejected` lifecycle cases inside the slice's `extraReducers` callback.
3. **Dispatch & Display**: Dispatch the thunk action and display loader spinners during fetch states.

---

## Thunk Execution Chart
```mermaid
graph TD
    Component[React UI] -->|1. Dispatch Thunk| Thunk[Thunk Middleware]
    Thunk -->|2. Dispatch Pending| Store[Redux Store]
    Thunk -->|3. Fetch API| API[API Server]
    API -->|4. Return Response| Thunk
    Thunk -->|5. Dispatch Success/Failure| Store
    Store -->|6. Updates UI states| Component
```

---

## Realistic Example: Fetching Profile Cards
```mermaid
sequenceDiagram
    participant UI as Profile Card Component
    participant Thunk as fetchUserProfile Thunk
    participant API as User Database API
    participant Reducer as User Slice Reducer

    UI->>Thunk: Dispatch fetchUserProfile(userId: 4)
    Thunk->>Reducer: Dispatch Pending
    Note over Reducer: loading: true, error: null
    Reducer-->>UI: View renders loading activity indicator
    Thunk->>API: HTTP GET /users/4
    API-->>Thunk: Return JSON { id: 4, name: "Alice" }
    Thunk->>Reducer: Dispatch Fulfilled (payload: user object)
    Note over Reducer: loading: false, user: payload
    Reducer-->>UI: View displays avatar and name "Alice"
```
