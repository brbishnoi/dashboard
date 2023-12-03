import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
const EditDetails = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [editableUser, setEditableUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Find the user details based on ID from the users state
    const selectedUser = users.find((user) => user.id === id);
    setUser(selectedUser);
    setEditableUser({ ...selectedUser });
  }, [id, users]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Implement save logic (in-memory, no persistence in this example)
    // Update the user details in the users state
    
    const updatedUsers = users.map((u) =>
      u.id === editableUser.id ? editableUser : u
    );
    setUsers(updatedUsers);
    setIsEditing(false);
    alert("Successfully edited the user Information")
    navigate('/')
  };

  const handleCancel = () => {
    // Reset editableUser to the original user details
    setEditableUser({ ...user });
    navigate('/')
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <h1>Edit Details</h1>
      <div>
        <label>ID: {user.id}</label>
      </div>
      <div>
        <label>Name:</label>
        { 
          <input
            type="text"
            name="name"
            value={editableUser.name}
            onChange={handleChange}
          />
        
        }
      </div>
      <div>
        <label>Email:</label>
        {
          <input
            type="text"
            name="email"
            value={editableUser.email}
            onChange={handleChange}
          />
        }
      </div>
      <div>
        <label>Role:</label>
        {
          <input
            type="text"
            name="role"
            value={editableUser.role}
            onChange={handleChange}
          />
        }
      </div>
      {
        <div>
          <button className="save" onClick={handleSave}>
            Save
          </button>
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      }
    </div>
  );
};

export default EditDetails;