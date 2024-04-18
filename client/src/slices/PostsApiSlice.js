/* eslint-disable no-unused-vars */


import { ApiSlice } from "./ApiSlice";
const POSTS_URL = "/api/posts"


export const postsSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
       
       
     createNewPost: builder.mutation({
        query: (data)=> ({
            url: `${POSTS_URL}/create-post`,
            method: 'POST',
            body: data
        })
     }),
     getExplorePosts: builder.query({
        query: ({id,pageNumber})=> ({
            url: `${POSTS_URL}/explore-posts/${id}`,
            params: {
                   pageNumber
            }
        }),
        
        keepUnusedDataFor : 5
     }),
    // explore-posts/:id
     
     editPost: builder.mutation({
        query: (data)=> ({
            url: `${POSTS_URL}/edit_post/${data._id}`,
            method: 'PUT',
            body: {...data}
        })
     }),
    toggleLikePost: builder.mutation({
        query: (data)=> ({
            url: `${POSTS_URL}/toggle-upvote`,
            method: 'POST',
            body: {...data}
        })
     }),
     toggleSavePost: builder.mutation({
        query: (data)=> ({
            url: `${POSTS_URL}/toggle-save`,
            method: 'POST',
            body: {...data}
        })
     }),
     addComment: builder.mutation({
        query: (data)=> ({
            url: `${POSTS_URL}/add-comment`,
            method: 'POST',
            body: {...data}
        })
     }),
     deletePost: builder.mutation({
        query: (data)=> ({
            url: `${POSTS_URL}/delete_post`,
            method: 'DELETE',
            body: data
        }),
        invalidatesTags: ['Post']
     }),
     getPosts: builder.query({
        query: ({pageNumber})=> ({
            url: `${POSTS_URL}/getPosts`,
            params: {
               pageNumber
            }
            
        }),
        keepUnusedDataFor: 5
     }),
     getPostById: builder.query({
        query: (id)=> ({
            url: `${POSTS_URL}/${id}`,
            
        }),
        keepUnusedDataFor: 5
     })
    })
})
export const { useCreateNewPostMutation, useGetExplorePostsQuery, useAddCommentMutation, useToggleSavePostMutation, useToggleLikePostMutation, useGetPostByIdQuery, useGetPostsQuery,useDeletePostMutation,useEditPostMutation} = postsSlice
