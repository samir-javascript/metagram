/* eslint-disable no-unused-vars */


import { ApiSlice } from "./ApiSlice";
const CONVERSATION_URL = "/api/chat"


export const conversationSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        sendMessage: builder.mutation({
            query: (data)=> ({
                url: `${CONVERSATION_URL}/send-message/${data.id}`,
                method: 'POST',
                body: {...data}
            })
         }),
         getMessages: builder.query({
            query: (id)=> ({
                url: `${CONVERSATION_URL}/get-conversation/${id}`,
                
            })
         }),
       
    })
    // get-conversation
     
    
})
export const {  useSendMessageMutation , useGetMessagesQuery } = conversationSlice
