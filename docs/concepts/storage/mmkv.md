# MMKV (react-native-mmkv)

MMKV is a ultra-fast, key-value storage library developed by Tencent, written in C++ and widely used in WeChat. It utilizes the **React Native JSI (JavaScript Interface)** instead of the traditional asynchronous bridge.

---

## Dependencies
```bash
npm install react-native-mmkv
```

---

## Configuration & Initialization
Initialize a storage instance. Since it accesses C++ directly, no extra native configuration is required.
```typescript
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
    id: 'user-storage',
    encryptionKey: 'optional-passphrase-to-encrypt' // Optional: encrypts MMKV disk files
});
```

---

## Implementation Steps
1. **Initialize Storage**: Create a shared storage instance file.
2. **Synchronous Write**: Write values synchronously using `storage.set('key', value)`.
3. **Synchronous Read**: Read values instantly using `storage.getString('key')`, `storage.getBoolean('key')`, or `storage.getNumber('key')`.
4. **Delete Records**: Call `storage.delete('key')` or `storage.clearAll()`.

---

## Native Bridge vs. JSI Direct Access

```mermaid
graph TD
    subgraph MMKV (JSI Synchronous)
        JS1[JS Context] -->|Direct C++ function call| JSI[JSI Engine]
        JSI -->|Read/Write memory mapped file| MMKV_Engine[MMKV C++]
        MMKV_Engine -->|Disk mapping| FileStorage[(mmap storage file)]
    end

    subgraph Secure Store (Bridge Asynchronous)
        JS2[JS Context] -->|1. JSON stringify serialize| Bridge[React Native Bridge]
        Bridge -->|2. Queue async message| OSThread[Native UI/Storage Thread]
        OSThread -->|3. Encrypt / Keychain save| SecurityFramework[Keychain iOS / Keystore Android]
    end
```

---

## Latency / Performance Comparison
Because MMKV maps files directly to memory (mmap) and bypasses string serialization over the bridge, read operations execute synchronously in under **0.1 ms**, making it up to **30x faster** than AsyncStorage.
