import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    makeVar,
} from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";
import { setContext } from 'apollo-link-context';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authToken = makeVar(token);
const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
});

const authLink: any = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = authToken() || "";
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            "x-jwt": token,
        }
    }
});

export const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read () {
                            return isLoggedInVar();
                        }
                    },
                    token: {
                        read () {
                            return authToken();
                        }
                    }
                }
            }
        }
    })
});

