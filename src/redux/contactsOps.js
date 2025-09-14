import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://68c67dda442c663bd0272c9d.mockapi.io/";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts")
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
        try {
            const response = await axios.post(`/contacts/`, contact);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            await axios.delete(`/contacts/${contactId}`);
            return contactId;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);