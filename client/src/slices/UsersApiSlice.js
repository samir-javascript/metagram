/* eslint-disable no-unused-vars */


import { ApiSlice } from "./ApiSlice";
const USERS_URL = "/api/users"


export const usersSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
       registerUser: builder.mutation({
          query: (data)=> ({
              url: `${USERS_URL}/register`,
              method: "POST",
              body: data
          })
       }),
       getUsers: builder.query({
        query: ()=> ({
            url: `${USERS_URL}`,
        }),
        keepUnusedDataFor: 5
     }),
     getAllUsers: builder.query({
        query: ()=> ({
            url: `${USERS_URL}/chat-users`,
        }),
        keepUnusedDataFor: 5
     }),
     userPosts: builder.query({
        query: (id)=> ({
            url: `${USERS_URL}/my-posts/${id}`,
        }),
        keepUnusedDataFor: 5
     }),
     getCurrentUser: builder.query({
        query: (id)=> ({
            url: `${USERS_URL}/profile/${id}`,
        }),
        keepUnusedDataFor: 5
     }),
     getUser: builder.query({
        query: ()=> ({
            url: `${USERS_URL}/profile`,
        }),
        keepUnusedDataFor: 5
     }),
     getSavedPosts: builder.query({
        query: ({pageNumber})=> ({
            url: `${USERS_URL}/get-saved_posts`,
            params: {
                pageNumber
            }
        }),
        keepUnusedDataFor: 5
     }),
       authUser: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/login`,
            method: "POST",
            body: data
        })
     }),
     getUserProfileFollowers: builder.query({
        query: (id)=> ({
            url: `${USERS_URL}/get_user_profile-followers/${id}`,
        }),
        keepUnusedDataFor: 5
     }),
     // get_user_profile-followers/:id
     toggleFollow: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/follow_users`,
            method: "POST",
            body: data
        })
     }),
     logOut: builder.mutation({
        query: ()=> ({
            url: USERS_URL,
            method: "POST"
        })
     }),
     updateProfile: builder.mutation({
        query: (data)=> ({
            url: `${USERS_URL}/update-profile/${data.id}`,
            method: "POST",
            body: {...data}
        })
     })
    })
})
export const { useAuthUserMutation, useGetAllUsersQuery, useGetUserProfileFollowersQuery, useUserPostsQuery, useGetSavedPostsQuery, useUpdateProfileMutation, useToggleFollowMutation, useGetUserQuery, useGetCurrentUserQuery, useRegisterUserMutation , useGetUsersQuery, useLogOutMutation} = usersSlice
