/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext ,useState , useEffect, useContext} from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
const SocketContext = createContext()
export const useSocketContext = () => {
	return useContext(SocketContext);
};
export const SocketContextProvider = ({children})=> {
    const { userInfo } = useSelector(state => state.auth)

    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    useEffect(()=> {
        if(userInfo) {
              const socket = io("http://localhost:5173", {
                query: {
                    userId: userInfo?._id
                }
              }) 
              setSocket(socket)
              socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});
              return ()=> socket.close()
        }else {
            if(socket) {
                socket.close()
                setSocket(null)
            }
        }
    } ,[userInfo])
    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
             {children}
        </SocketContext.Provider>
    )
}

