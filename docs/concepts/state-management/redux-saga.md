# Redux Saga

Redux Saga is a middleware that uses ES6 Generators (functions with `function*` syntax) to make asynchronous side-effects (like data fetching and browser caching) easier to manage, execute, write, and test.

---

## Dependencies
```bash
npm install redux-saga
```

---

## Configuration
Setup saga middleware, combine saga generators, and launch watcher tasks.
```typescript
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
```

---

## Implementation Steps
1. **Watcher Saga**: Write a generator function listening to trigger actions (e.g. `takeLatest(FETCH_REQUEST, fetchWorker)`).
2. **Worker Saga**: Implement side-effect generator code (use `call` for promises, and `put` to dispatch final actions).
3. **Register Root Saga**: Combine all watcher sagas into a single generator running task loop.

---

## Saga Architecture Chart
```mermaid
graph TD
    UI[React Component] -->|1. Dispatches trigger action| Store[Redux Store]
    Store -->|2. Intercepted by| Watcher[Watcher Saga]
    Watcher -->|3. Spawns| Worker[Worker Saga]
    Worker -->|4. yield call API| API[External Network API]
    API -->|5. Returns Data| Worker
    Worker -->|6. yield put Success action| Store
    Store -->|7. Updates state| Reducer[Reducer]
    Reducer -->|8. Re-renders UI| UI
```

---

## Realistic Example: Auto-Saving Document Logs
```mermaid
sequenceDiagram
    participant UI as Editor Input
    participant Saga as Saga Debouncer Watcher
    participant API as Server Database

    UI->>Saga: User types text -> Dispatches TEXT_CHANGED
    Note over Saga: Debounces action for 1000ms<br/>Cancels previous autosave tasks if active
    Saga->>API: yield call(saveTextData, updatedText)
    API-->>Saga: Response Status: 200 OK
    Saga->>UI: yield put(AUTO_SAVE_SUCCESS) -> Visual checkmark shown
```
