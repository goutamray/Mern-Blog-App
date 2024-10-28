import { useEffect, useState } from "react"
import moment from 'moment'; 

const Comment = ({ item }) => {
   const [user, setUser] = useState({})


  // get user 
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${item.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser(); 
  }, [item]);


  return (
    <div className="flex p-4 border-b dark:border-gray-600 ">
       <div className="flex-shrink-0 mr-3">
        <img className="h-10 w-10 rounded-full bg-gray-200" src={user?.photo} alt={user?.name} />
       </div>
       <div className="flex-1">
        <div className="flex items-center gap-1">
          <span className="font-bold mr-1 text-sm truncate "> {user ? `@${user?.name}` : "anonymous user"}</span>
          <span className="text-gray-500 text-xs"> {moment(item?.createdAt).fromNow()} </span>
        </div>
        <p className="text-gray-500 pb-2"> {item?.content}</p>
       </div>
    </div>
  )
}

export default Comment
