import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isRunning: false,
  isPaused: false,
  seconds: 0,
  startTime: null,
  endTime: null,
  music: null,
  sessions: [],
};

export const fetchSessions = createAsyncThunk(
  "session/fetchSessions",
  async () => {
    const res = await axios.get("http://localhost:5000/sessions");
    return res.data;
  }
);

export const saveSession = createAsyncThunk(
  "session/saveSession",
  async (
    { start_time, end_time, duration, milk_quantity },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("http://localhost:5000/sessions", {
        start_time,
        end_time,
        duration,
        milk_quantity,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startSession: (state) => {
      state.isRunning = true;
      state.isPaused = false;
      state.startTime = new Date();
      const musicFiles = [
        "/music/After-the-Rain-Inspiring-Atmospheric-Music.mp3",
        "/music/Moon-Waltz.mp3",
        "/music/sb_adriftamonginfinitestars.mp3",
        "/music/scott-buckley-moonlight.mp3",
      ];
      const randomMusic =
        musicFiles[Math.floor(Math.random() * musicFiles.length)];
      state.music = randomMusic;
    },
    pauseSession: (state) => {
      state.isPaused = true;
    },
    resumeSession: (state) => {
      state.isPaused = false;
    },
    stopSession: (state) => {
      state.isRunning = false;
      state.isPaused = false;
      state.endTime = new Date();
    },
    resetSession: (state) => {
      state.seconds = 0;
      state.startTime = null;
      state.endTime = null;
      state.music = null;
    },
    incrementTimer: (state) => {
      state.seconds += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSessions.fulfilled, (state, action) => {
      state.sessions = action.payload;
    });
  },
});

export const {
  startSession,
  pauseSession,
  resumeSession,
  stopSession,
  resetSession,
  incrementTimer,
} = sessionSlice.actions;

export default sessionSlice.reducer;
