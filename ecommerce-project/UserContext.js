 import {Children, createContext,useState} from "react";

 const UserType = createContext();

 const UserContext = ({Children}) => {
    const [userId,setUserId] = useState("");
    return (
        <UserType.Provider value={{userId,setUserId}}>
            {Children}
        </UserType.Provider>
    )
 }

 export {UserType,UserContext}