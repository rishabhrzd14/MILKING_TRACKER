import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions } from "../slices/sessionSlice";
import "./historyPage.css"; 

export default function HistoryPage() {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.session.sessions);

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

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
            {sessions.map((s, i) => (
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
      </div>
    </div>
  );
}
