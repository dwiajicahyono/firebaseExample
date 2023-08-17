import React, { useState, Fragment } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";
import firebase from "./firebase";

const App = () => {
  // Data
  const usersData = [{ id: null, name: "", username: "" }];
  const initialFormState = { id: null, name: "", username: "" };

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  // CRUD operations
  const addUser = user => {
    firebase
      .firestore()
      .collection("times")
      .add({
        name: user.name,
        username: user.username
      })
      .then(() => {
        //setTitle("");
        //setTime("");
      });
  };

  const deleteUser = id => {
    setEditing(false);

    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = updatedUser => {
    setEditing(false);
    firebase
      .firestore()
      .collection("times")
      .doc(updatedUser.id)
      .set(updatedUser);
  };

  const editRow = user => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
    //console.log("editRow", user);
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks (Firebase)</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable
            users={users}
            editRow={editRow}
            deleteUser={deleteUser}
            editing={editing}
            setEditing={setEditing}
            currentUser={currentUser}
            updateUser={updateUser}
          />
        </div>
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
