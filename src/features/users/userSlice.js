import { createSlice } from '@reduxjs/toolkit'
import sampleUsers from '../../data/sample.json'
import { getNextId } from '../../utils/helpers'

const initialState = {
  users: sampleUsers,
  filters: {
    role: 'All',
    status: 'All',
    search: '',
  },
  sorting: {
    field: 'name',
    direction: 'asc',
  },
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const payload = action.payload
      const userWithId = {
        ...payload,
        id: getNextId(state.users),
        createdAt: payload.createdAt || new Date().toISOString().slice(0, 10),
      }
      state.users.push(userWithId)
    },
    updateUser: (state, action) => {
      const { id, changes } = action.payload
      const index = state.users.findIndex((user) => user.id === id)
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...changes }
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
    setRoleFilter: (state, action) => {
      state.filters.role = action.payload
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload
    },
    resetFilters: (state) => {
      state.filters = { role: 'All', status: 'All', search: '' }
    },
    setSorting: (state, action) => {
      const { field } = action.payload
      if (state.sorting.field === field) {
        state.sorting.direction = state.sorting.direction === 'asc' ? 'desc' : 'asc'
      } else {
        state.sorting.field = field
        state.sorting.direction = 'asc'
      }
    },
    setSortingState: (state, action) => {
      state.sorting = action.payload
    },
  },
})

export const {
  addUser,
  updateUser,
  deleteUser,
  setRoleFilter,
  setStatusFilter,
  setSearchFilter,
  resetFilters,
  setSorting,
  setSortingState,
} = userSlice.actions

export default userSlice.reducer
