
import { setMessages } from "@/redux/chat/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRTM = () => {
    const dispatch = useDispatch();
    const { socket } = useSelector(store => store.socketio);
    const { messages } = useSelector(store => store.chat);
    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            dispatch(setMessages([...messages , newMessage])); // ✅ Fix: Append message
        });
    
        return () => {
            socket?.off('newMessage'); // ✅ Properly remove event listener on unmount
        };
    }, [messages,socket]); // ✅ Fix: Only runs when socket changes
};
export default useGetRTM;