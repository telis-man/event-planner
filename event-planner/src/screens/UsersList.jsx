import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  useUserId,
  useUserIdUpdate,
} from "../features/components/GlobalsContext";
import "./UsersListStyle.scss";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const setUserId = useUserIdUpdate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/posts");
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/posts/${user._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Post deleted successfully!");
        window.location.reload();
      } else {
        console.log("Failed to delete post.", response);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="listContainer">
      <h1>List of participants</h1>
      {users.length === 0 ? (
        <div>No participants yet.</div>
      ) : (
        <ul>
          {users.map((user) => (
            <div className="listDiv">
              <div className="textDiv">
                <li key={user._id} className="liItem">
                  {user.name} | {user.lastName} | {user.email} | {user.age}
                </li>
              </div>
              <div className="buttonDiv">
                <button
                  onClick={() => {
                    setUserId(user);
                    console.log("selected user added:", user);
                  }}
                >
                  <Link to="/">Edit</Link>
                </button>

                <button
                  onClick={() => {
                    handleDelete(user);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
