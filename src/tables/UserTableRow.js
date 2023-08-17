import React, { useState, useEffect, Fragment } from "react";
import firebase from "../firebase";

function useTimes(sortBy = "TIME_ASC") {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    // unsubscribe callback when done
    const unsubscribe = firebase
      .firestore()
      .collection("times")
      //.orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot(snapshot => {
        const newTimes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTimes(newTimes);
      });
    return () => unsubscribe();
  }, [sortBy]);

  return times;
}

const UserTableRow = props => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleDeleteClick = id => {
    firebase
      .firestore()
      .collection("times")
      .doc(id)
      .delete();
  };

  const handleUpdateItemClick = data => {
    firebase
      .firestore()
      .collection("times")
      .doc(data.id)
      .set(data);
    props.setEditing(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return props.editing && props.currentUser.id === props.userValue.id ? (
    <Fragment>
      <tr key={props.userValue.id}>
        <td>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <button
            onClick={() => props.setEditing(false)}
            className="button muted-button"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdateItemClick(user)}
            className="button muted-button"
          >
            Update
          </button>
        </td>
      </tr>
    </Fragment>
  ) : (
    <Fragment>
      <tr key={props.userValue.id}>
        <td>{props.userValue.name}</td>
        <td>{props.userValue.username}</td>
        <td>
          <button
            onClick={() => {
              props.editRow(props.userValue);
            }}
            className="button muted-button"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(props.userValue.id)}
            className="button muted-button"
          >
            Delete
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default UserTableRow;
