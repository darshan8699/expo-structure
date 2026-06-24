# 🚀 GraphQL Setup & Integration (Apollo Client & Codegen)

This document provides a comprehensive guide on how GraphQL is configured inside the `ExpoStructure` project template, mirroring the architecture of the **Asthma Australia App**.

---

## 📂 Folder & File Structure

All client configurations and providers reside in `src/apis/graphql/`, while type outputs compile directly into `src/common/types/`:

```text
ExpoStructure/
├── codegen.yml                              # GraphQL Code Generator configuration
├── src/
│   ├── apis/
│   │   ├── api.config.ts                    # Centralized config (REST & GraphQL URLs)
│   │   └── graphql/
│   │       ├── api.client.ts                # REST API Client (Axios/Fetch)
│   │       ├── graphql.client.ts            # Apollo Client initialization
│   │       └── api.provider.tsx             # React Apollo Provider wrapper
│   ├── common/
│   │   └── types/
│   │       └── generated.graphql.ts         # Automatically generated typed Apollo hooks
```

---

## 🛠️ Step-by-Step Installation

If setting this up in a new environment, follow these steps:

### 1. Install Dependencies

Run the following command to install Apollo Client, GraphQL, and the Code Generator:

```bash
npm install @apollo/client graphql
npm install -D @graphql-codegen/cli @graphql-codegen/client-preset @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

### 2. Configure Package Scripts

Add the code generation script inside your `package.json` utilizing `dotenv` to load env variables:

```json
"scripts": {
  "codegen": "node -r dotenv/config node_modules/.bin/graphql-codegen --config codegen.yml"
}
```

### 3. Setup Codegen (`codegen.yml`)

Create a `codegen.yml` in the root of your project:

```yaml
overwrite: true
schema:
  - '${EXPO_PUBLIC_GRAPHQL_API_URL}':
      headers:
        User-Agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.3'
generates:
  src/common/types/generated.graphql.ts:
    documents: "src/**/*.request.graphql"
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
    config:
      maybeValue: T
```

### 4. Setup Client & Provider

- **Apollo Client (`graphql.client.ts`)**: Creates the HttpLink using the config URLs and configures token authentication middleware.
- **Provider Wrapper (`api.provider.tsx`)**: Wraps Apollo client inside `<ApolloProvider client={client}>`.
- **Root Integration (`AppProvider.tsx`)**: Make sure to import and wrap your application layout inside `<ApiProvider>`:

  ```tsx
  import { ApiProvider } from "../../apis/graphql/api.provider";

  const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
      <ApiProvider>
        <AuthProvider>{children}</AuthProvider>
      </ApiProvider>
    );
  };
  ```

---

## 📝 How to write and use GraphQL requests

### 1. Write the operation file

Create your query or mutation document ending in `.request.graphql` under your components or modules directory.
Example: `src/components/modules/account/settings/settings.request.graphql`

```graphql
query GetAllAsthmaGoals($pageSize: Int = 100) {
  getAllAsthmagoals(pageSize: $pageSize) {
    items {
      id
      name
      status
    }
  }
}
```

### 2. Compile hooks

Execute code generation inside the terminal:

```bash
npm run codegen
```

This generates typed React hooks (e.g. `useGetAllAsthmaGoalsQuery`) inside `src/common/types/generated.graphql.ts`.

### 3. Consume the hook in your components

Simply import the generated hook and use it:

```tsx
import React from "react";
import { FlatList, Text, ActivityIndicator } from "react-native";
import { useGetAllAsthmaGoalsQuery } from "@/common/types/generated.graphql";

export const SettingsScreen = () => {
  const { data, loading, error } = useGetAllAsthmaGoalsQuery({
    variables: { pageSize: 10 },
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const goals = data?.getAllAsthmagoals?.items || [];

  return (
    <FlatList
      data={goals}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text>{item.name} ({item.status})</Text>
      )}
    />
  );
};

---

## ⚠️ Avoiding Memory Exhaustion (ESLint flat config)

Because staging/production GraphQL schemas can be extremely large, the generated types file (`generated.graphql.ts`) can exceed 10+ MB in size. To prevent Node.js Out-Of-Memory (OOM) errors during ESLint runs, you **must** configure ESLint to ignore the generated file.

Add the generated file path to your `eslint.config.js` `ignores` section:
```javascript
module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "src/common/types/generated.graphql.ts"],
  }
]);
```
```
