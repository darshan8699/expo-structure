# Secure Storage (expo-secure-store)

Secure Storage is a system service that encrypts data before storing it in a persistent, secure keystore on the device. It utilizes the iOS Keychain and Android Keystore system, protecting sensitive credentials from being accessed on rooted devices.

---

## Dependencies
```bash
npx expo install expo-secure-store
```

---

## Implementation Steps
1. **Asynchronous Write**: Encrypt and store data asynchronously using:
   ```typescript
   await SecureStore.setItemAsync('key', 'value');
   ```
2. **Asynchronous Read**: Fetch and decrypt data using:
   ```typescript
   const value = await SecureStore.getItemAsync('key');
   ```
3. **Delete Secrets**: Remove items using:
   ```typescript
   await SecureStore.deleteItemAsync('key');
   ```

---

## Security Model: Keystore / Keychain

```mermaid
graph LR
    App[React Native App] -->|1. Async request| Service[Secure Store Service]
    Service -->|2. Request Encrypt/Decrypt| Enclave[Hardware Secure Enclave / TEE]
    Enclave -->|3. Perform crypt operations| KeyStore[Android Keystore / iOS Keychain]
    KeyStore -->|4. Return token| App
```

---

## Realistic Example: App Bootstrapping Token Check

This flowchart demonstrates how an application checks auth states during startup, utilizing **Secure Store** for credentials.

```mermaid
sequenceDiagram
    participant App as App Initialization
    participant Secure as Secure Store (Keychain)
    participant UI as Login / Home Screen Routing

    App->>Secure: getItemAsync('jwt_auth_token')
    Note over Secure: asynchronous Keystore decryption
    Secure-->>App: Return Promise -> Resolves 'eyJhbG...' (Token found)
    App->>UI: Auth status valid -> Navigate directly to Dashboard Screen
```
