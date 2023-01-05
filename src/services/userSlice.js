import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCreatePost = createAsyncThunk(
  "post/create",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}/post`,
      data
    );
    try {
      if (response.status === 201) {
        return fulfillWithValue(response.data);
      }
    } catch (error) {
      if (error.reducers.status === 400) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserData = createAsyncThunk(
  "getUserDAta",
  async (emty, { fulfillWithValue, rejectWithValue }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/get`);
    try {
      if (response.status === 201) {
        return fulfillWithValue(response.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const getDeleteUser = createAsyncThunk(
  "post/delete",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_KEY}/delete/${id}`
    );
    try {
      if (response.status === 201) {
        return fulfillWithValue(response.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const getEditByUser = createAsyncThunk(
  "post/edit",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}/get/${id}`
    );
    try {
      if (response.status === 201) {
        return fulfillWithValue(response.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const getUpdateUser = createAsyncThunk(
  "post/update",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    const id = data?.isId;
    const updateData = data?.postValue;
    const response = await axios.put(
      `${process.env.REACT_APP_API_KEY}/update/${id}`,
      updateData
    );
    try {
      if (response.status === 201) {
        return fulfillWithValue(response.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

const initialState = {
  loading: false,
  data: [],
  userData: [],
  error: false,
  message: "",
  errorMessage: "",
  deleteMessage: "",
  getEditDataById: [],
};

const createApiSlice = createSlice({
  name: "createApiSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCreatePost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getCreatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
        state.message = "user created successfully";
      })
      .addCase(getCreatePost.rejected, (state) => {
        state.error = true;
        state.errorMessage = "User Already exists";
        state.loading = false;
      });
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.error = true;
        state.errorMessage = "data not found";
      });
    builder
      .addCase(getDeleteUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getDeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.deleteMessage = "Delete User";
      })
      .addCase(getDeleteUser.rejected, (state) => {
        state.error = true;
        state.errorMessage = "somthin wrong";
      });
    builder
      .addCase(getEditByUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getEditByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.getEditDataById = action.payload;
      })
      .addCase(getEditByUser.rejected, (state) => {
        state.error = true;
        state.errorMessage = "somthin wrong";
      });
    builder
      .addCase(getUpdateUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = "User update successfully";
      })
      .addCase(getUpdateUser.rejected, (state) => {
        state.error = true;
        state.errorMessage = "somthin wrong";
      });
  },
});

export default createApiSlice.reducer;
