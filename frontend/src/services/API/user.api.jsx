import { useEffect } from "react";
import endpoint from "./axios";

const APIdataUsers = (setUsers, USERS_URL, setLoading) => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await endpoint.get(USERS_URL);
        setUsers(res.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [setUsers, USERS_URL, setLoading]);
};


export default APIdataUsers;

