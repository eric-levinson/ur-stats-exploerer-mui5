import { configureStore } from '@reduxjs/toolkit'
import chasingReducer from './ballchasing/ballchasingSlice'

export default configureStore({
  reducer: {
    chasing: chasingReducer
  }
})