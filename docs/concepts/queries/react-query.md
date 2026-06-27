# Queries: TanStack Query (React Query)

TanStack Query (React Query) manages asynchronous server state. This guide outlines how to configure, set up cache options, invalidation flows, and utilize background refetching in React Native.

---

## Dependencies
```bash
npm install @tanstack/react-query
```

---

## Configuration & Store Providers

To enable React Query, instantiate a global `QueryClient` and wrap the root application tree in `QueryClientProvider`.

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 30, // Data remains "fresh" for 30 seconds
            gcTime: 1000 * 60 * 5, // Unused cached data is garbage collected after 5 minutes
        },
    },
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
```

---

## Implementation Steps

1. **Setup Client Provider**: Wrap the main entry layout in `<QueryClientProvider>`.
2. **Implement Fetching (`useQuery`)**: Define fetch methods and bind queries using unique keys:
   ```typescript
   const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
   ```
3. **Implement Mutations (`useMutation`)**: Perform write actions (POST/PATCH/DELETE) and invalidate query caches to trigger auto-refetches:
   ```typescript
   const queryClient = useQueryClient();
   const mutation = useMutation({
       mutationFn: updateProfile,
       onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
   });
   ```

---

## Query Cache States & Architecture Chart

```mermaid
graph TD
    Query[useQuery] --> CacheCheck{Cache exists & fresh?}
    CacheCheck -->|Yes| Fresh[Render Cache instantly]
    CacheCheck -->|No - Stale| ServeStale[1. Serve stale cache instantly]
    ServeStale --> Refetch[2. Trigger background HTTP refetch]
    Refetch --> Update[3. Update Cache & re-render UI]
    CacheCheck -->|No - Empty| Network[1. Render loading spinner]
    Network --> NetworkFetch[2. Fetch HTTP request]
    NetworkFetch --> UpdateCache[3. Store in cache & render view]
```

---

## Realistic Example: Social Feed Post Reload

This sequence shows how client caching operates when navigating back to a social media feed, updating data silently in the background.

```mermaid
sequenceDiagram
    participant UI as Social Feed View
    participant Cache as React Query Client Cache
    participant Server as Server API

    Note over UI, Cache: Cache contains data from 5 minutes ago (Stale)
    UI->>Cache: Request ['feed'] Query
    Cache-->>UI: Instantly return cached feed data (Fluid UI render)
    Cache->>Server: Trigger background HTTP GET /feed (Stale-While-Revalidate)
    Server-->>Cache: Returns updated feed JSON (New posts added)
    Cache->>Cache: Updates feed cache entry
    Cache-->>UI: Silently injects new feed items, list increases layout smoothly
```

---

## Mutation Invalidation Cycle

When updating records on the server, the mutation automatically invalidates the fetch cache, keeping UI views synchronized.

```mermaid
graph LR
    UI[Edit Form] -->|1. Submit Changes| Mutation[useMutation: POST /items]
    Mutation -->|2. Network Request| DB[Database Server]
    DB -->|3. Success Response| Mutation
    Mutation -->|4. Invalidate Query Key: 'items'| Client[Query Client Cache]
    Client -->|5. Refetch automatically| UIList[Items List Screen]
```
