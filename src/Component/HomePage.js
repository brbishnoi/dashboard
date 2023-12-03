import React, { useState} from 'react';
import './index.css';
import {useNavigate} from 'react-router-dom'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
const HomePage = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageClick = (page) => setCurrentPage(page);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleDelete = () => {
    console.log('Delete selected rows:', selectedRows);

    const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(updatedUsers);

    setSelectedRows([]);
  };

  const handleSelectAll = () => {
    const allSelected = selectedRows.length === itemsPerPage;
    const newSelectedRows = allSelected
      ? []
      : users
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((user) => user.id);
    setSelectedRows(newSelectedRows);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="app-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="all"
                name="all"
                value="all"
                checked={
                  currentItems.length > 0 &&
                  selectedRows.length === currentItems.length
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr
              key={user.id}
              className={selectedRows.includes(user.id) ? 'selected-row' : ''}
            >
              <td>
                <input
                  type="checkbox"
                  id={`checkbox-${user.id}`}
                  name={`checkbox-${user.id}`}
                  value={user.id}
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(user.id)}>
                  <FiEdit />
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageClick(1)}>First Page</button>
        <button
          onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
        >
          Previous Page
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageClick(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
        >
          Next Page
        </button>
        <button onClick={() => handlePageClick(totalPages)}>Last Page</button>
      </div>
      <div className="actions">
        <button className="select-all" onClick={handleSelectAll}>
          {selectedRows.length === currentItems.length
            ? 'Deselect All'
            : 'Select All'}
        </button>
        <button className="delete-selected" onClick={handleDelete}>
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default HomePage;