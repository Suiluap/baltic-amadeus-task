import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { GiphyFetch, type GifsResult } from "@giphy/js-fetch-api";
import type { AppState } from "../store";
import type { IGif } from "@giphy/js-types";

interface GifState {
  loading: boolean;
  data: GifsResult | null;
  savedData: { position: number; data: IGif }[];
  error: string | null;
  offset: number;
}

const initialState: GifState = {
  loading: true,
  data: null,
  savedData: [],
  error: null,
  offset: 0,
};

const giphy = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);
export const fetchGifs = createAsyncThunk(
  "fetchGifs",
  async (_, { getState }) => {
    const state = getState() as AppState;
    const data = await giphy.trending({ limit: 12, offset: state.gif.offset });
    data.data.sort((a, b) => {
      return (
        new Date(a.import_datetime).getTime() -
        new Date(b.import_datetime).getTime()
      );
    });
    state.gif.savedData.forEach((item) => {
      data.data[item.position] = item.data;
    });
    return data;
  }
);

const gifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<{ position: number; data: IGif }>) => {
      state.savedData.push({
        position: action.payload.position,
        data: action.payload.data,
      });
    },
    remove: (state, action: PayloadAction<number>) => {
      state.savedData = state.savedData.filter(
        (item) => item.position != action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGifs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGifs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.offset += 12;
    });
    builder.addCase(fetchGifs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong...";
    });
  },
});

export default gifSlice.reducer;
export const { save, remove } = gifSlice.actions;
