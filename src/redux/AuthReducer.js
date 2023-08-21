import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
// const baseUrl = 'http://ultron.com/'
 const baseUrl = 'http://localhost:5000/'

export const LoginRegisterThunk = createAsyncThunk(
    'auth/loginRegister',
    async ({username, password, name},{dispatch}) =>{
        const response = await axios.post(`${baseUrl}/api/${name}`, {username, password})
        const redirectUrl = response.data['redirect_url'];
        dispatch(setRedirectUrl(redirectUrl))
        return {username, password}
    }
)
export const LogoutThunk = createAsyncThunk(
    'auth/logout',
    async (_,{dispatch}) =>{
        const response = await axios.post(`${baseUrl}/api/logout`)
        const redirectUrl = response.data['redirect_url'];
        dispatch(setRedirectUrl(redirectUrl));
        window.location.href = redirectUrl;
    }
)

const initialState = {
    username: null,
    password: null,
    redirectUrl: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setRedirectUrl:(state,action)=>{
            state.redirectUrl= action.payload
        },
        resetRedirectUrlAC: (state)=>{
            state.redirectUrl = null
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(LoginRegisterThunk.fulfilled, (state, action)=>{
                const {username, password} = action.payload
                state.username = username
                state.password = password
            })
    }
})
export const { setRedirectUrl, resetRedirectUrlAC } = authSlice.actions;
export default authSlice.reducer