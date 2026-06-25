import Constants from "expo-constants";

export const apiConfig = {
  baseURL: "https://api.example.com/v1",
  graphQlApiUri:
    Constants.expoConfig?.extra?.apiGraphqlUrl ||
    process.env.EXPO_PUBLIC_GRAPHQL_API_URL ||
    "https://your-graphql-endpoint.com/graphql",
};
