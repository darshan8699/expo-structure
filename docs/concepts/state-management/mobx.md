# MobX

MobX is a battle-tested state management library that applies transparent functional reactive programming (TFRP) to make state management simple and scalable. It treats application state as a spreadsheet that automatically updates cells when formulas change.

---

## Dependencies
```bash
npm install mobx mobx-react-lite
```

---

## Implementation Steps
1. **Create Store Class**: Build a JS class declaring observable properties and actions.
2. **Bind Reactivity**: Call `makeAutoObservable(this)` inside the class constructor.
3. **Reactive UI Wrap**: Wrap components with the `observer` high-order component. Components will track state updates automatically.

---

## Observable Loop Chart
```mermaid
graph LR
    subgraph UI View Layer
        UI[observer component] -->|1. User events| Actions[Store Action Methods]
    end
    subgraph MobX Observable Engine
        Actions -->|2. Modifies| Observables[Observable Properties]
        Observables -->|3. Automatically triggers| Computed[Computed Properties]
        Observables -->|4. Propagates changes| UI
    end
```

---

## Realistic Example: Live Stop Watch timer
```mermaid
sequenceDiagram
    participant UI as StopWatch Screen
    participant Store as Timer Store (makeAutoObservable)

    UI->>Store: Start Timer -> Calls startTimer() action
    loop Every Second
        Note over Store: tick() action increments secondsPassed += 1
        Store->>UI: UI re-renders elapsed minutes/seconds automatically
    end
```
