import { useState, useEffect } from "react";
import axios from "axios";
import { setItemToLocalStorage } from "helpers/localStorage";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!users.length){
      fetchUsers(1);
    }
  }, []);

  useEffect(() => {
    setItemToLocalStorage("users", users);
  }, [users]);

  async function fetchUsers(pageNum) {
    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?results=25&page=${pageNum}`
    );
    setIsLoading(false);
    setUsers((prevUsers) => [...prevUsers, ...response.data.results]);
  }

  return { users, isLoading, fetchUsers };
};