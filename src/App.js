import React, { useState, useEffect } from 'react';

const fetchData = async () => {
  try {
    const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data1 = await response.json();
    console.log(data1);
    return data1; // Return the fetched data
  } catch (err) {
    console.error('Error fetching data:', err);
    return []; // Return an empty array in case of error
  }
};

const PaginatedTable = ({ data }) => { // Receive data as a prop
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span> {currentPage} </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <div>
      <PaginatedTable data={data} /> {/* Pass fetched data to PaginatedTable component */}
    </div>
  );
};

export default App;
