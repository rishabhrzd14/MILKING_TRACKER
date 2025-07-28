import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions } from "../slices/sessionSlice";
import "./historyPage.css";

export default function HistoryPage() {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.session.sessions);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  const totalPages = Math.ceil(sessions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = sessions.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="history-container">
      <h2 className="history-heading">Milking History</h2>
      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration (s)</th>
              <th>Milk Collected (L)</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((s, i) => (
              <tr key={i}>
                <td>{new Date(s.start_time).toLocaleDateString()}</td>
                <td>{new Date(s.start_time).toLocaleTimeString()}</td>
                <td>{new Date(s.end_time).toLocaleTimeString()}</td>
                <td>{s.duration}</td>
                <td>{s.milk_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
