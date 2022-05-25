import React from "react";
import { seeAllUsersUrl } from "../settings";
import { useState, useEffect } from "react";
import "../styles/seeAllUsers.css";
import backgroundimg from "../images/CocktailsBackground.jpeg";
import LoadingIcons from "react-loading-icons";

const SeeAllUsers = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error !== null || error !== undefined) {
      let error = localStorage.getItem("error");
      setError(error);
    }

    const getUsers = async () => {
      const fromAPI = await getUserList();
      setUserList(fromAPI);
    };
    getUsers();
  }, []);

  const getUserList = async () => {
    document.querySelector(".loading").style.display = "block";
    let token = localStorage.getItem("token");
    const res = await fetch(seeAllUsersUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": token,
      },
    });
    const data = await res.json();
    if (data.code === 403) {
      setError(false);
      localStorage.setItem("error", false);
    } else {
      setError(true);
      localStorage.setItem("error", true);
    }
    document.querySelector(".loading").style.display = "none";
    return data;
  };

  const styles = {
    bgElement: {
      backgroundImage: `url(${backgroundimg})`,
      padding: "5%",
    },

    content: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  };

  return (
    <div style={styles.bgElement}>
      <LoadingIcons.ThreeDots className="loading" />
      {error ? (
        <div style={styles.content}>
          <table>
            <thead>
              <tr>
                <th>User name</th>
                <th colSpan="2">Roles</th>
              </tr>
            </thead>

            <tbody>
              {userList.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <a href={`/changeUser/${user.userName}`}>
                        {user.userName}
                      </a>
                    </td>
                    {user.roleList.map((role, index) => {
                      if (user.roleList.length === 1) {
                        return (
                          <td colSpan="2" key={index}>
                            {role.roleName}
                          </td>
                        );
                      } else {
                        return <td key={index}>{role.roleName}</td>;
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>You do not have access to this page</h2>
      )}
    </div>
  );
};

export default SeeAllUsers;
