import { logoutUser } from "./usersSlice";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
const baseQuery = fetchBaseQuery({baseUrl: ""});
async function baseQueryWithAuth(args, api, extra) {
    const result = await baseQuery(args, api, extra);
    // Dispatch the logout action on 401.
    if (result.error && result.error.status === 401) {
      api.dispatch(logoutUser());
    }
    return result;
  }
export const ApiSlice = createApi({
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Post','User',"Message"],
    endpoints: ()=> ({})
})
