import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startSession,
  pauseSession,
  resumeSession,
  stopSession,
  resetSession,
  incrementTimer,
  saveSession,
} from "../slices/sessionSlice";
import "./milkingSession.css";
import PopupModal from "./PopupModal";

export default function MilkingSession() {
  const { isRunning, isPaused, seconds, startTime, music } = useSelector(
    (state) => state.session
  );
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => dispatch(incrementTimer()), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, isPaused, dispatch]);

  const handleStart = () => {
    dispatch(startSession());
    setTimeout(() => audioRef.current?.play(), 300);
  };

  const handlePause = () => {
    dispatch(pauseSession());
    audioRef.current?.pause();
  };

  const handleResume = () => {
    dispatch(resumeSession());
    audioRef.current?.play();
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    audioRef.current?.pause();
    dispatch(stopSession());
    setShowPopup(true);
  };

  const handleSubmitMilk = async (milk) => {
    try {
      await dispatch(
        saveSession({
          start_time: startTime,
          end_time: new Date(),
          duration: seconds,
          milk_quantity: milk,
        })
      );
      setPopupMessage("Milk's Quantity has been Saved Successfully ✅");
    } catch (err) {
      console.error("Error saving session:", err);
      setPopupMessage("❌ Failed to save session");
    }

    setTimeout(() => {
      setShowPopup(false);
      dispatch(resetSession());
      setPopupMessage(""); 
    }, 3000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });
  };

  return (
    <div className="session-container">
      <audio ref={audioRef} src={music || null} loop />

      <div className="session-header">
        <h2>Welcome to Milking Tracker with Music</h2>
      </div>

      <div className="session-instruction-row">
        <div className="session-instruction">
          Click on the button to start the milking.
        </div>
        <div className="current-time">IST: {formatTime(currentTime)}</div>
      </div>

      <div className="session-timer-box">
        <div className="session-timer">
          {new Date(seconds * 1000).toISOString().slice(11, 19)}
        </div>

        <div className="session-controls">
          {!isRunning && (
            <button onClick={handleStart} className="session-button">
              Start Milking
            </button>
          )}
          {isRunning && !isPaused && (
            <button onClick={handlePause} className="session-button">
              Pause
            </button>
          )}
          {isRunning && isPaused && (
            <button onClick={handleResume} className="session-button">
              Resume
            </button>
          )}
          {isRunning && (
            <button onClick={handleStop} className="session-button">
              Stop
            </button>
          )}
        </div>
      </div>

     {/* modal data */}
      <PopupModal
        isOpen={showPopup}
        onClose={() => {
          setShowPopup(false);
          setPopupMessage("");
        }}
        onSubmit={handleSubmitMilk}
        message={popupMessage}
      />
    </div>
  );
}
