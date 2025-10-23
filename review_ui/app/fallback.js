'use client'

import ErrorPermission from "./Components/Errors/ErrorPermission";
import {useEffect, useState} from "react"

export default function Fallback({children}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  
  return user ? children : <ErrorPermission/>;
}