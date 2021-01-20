import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./index";

interface UserState {
    user: Object
}

const initialState: UserState = {
    user: Object.create(null)
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Object>) => {
            console.log('action', action)
            state.user = action.payload
        }
    }
})

export const { setUser } = userSlice.actions

// 初始化用户信息
export const initUser = (): AppThunk => dispatch => {

  const getUser = async () => {
    // const result: any = await getUserProfile()
    const result: any = {
      id: 0,
      username: 'username',
    }
    console.log('result', result)
    if (result.code === 0) {
      let { username, id } = result.data
      dispatch(setUser({ username, id }))
    }
  }
  getUser()

}

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer