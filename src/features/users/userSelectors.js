import { createSelector } from '@reduxjs/toolkit'
import { normalizeForSort } from '../../utils/helpers'

export const selectUsersState = (state) => state.users
export const selectAllUsers = (state) => state.users.users
export const selectFilters = (state) => state.users.filters
export const selectSorting = (state) => state.users.sorting

export const selectFilteredUsers = createSelector(
  [selectAllUsers, selectFilters],
  (users, filters) => {
    const searchValue = filters.search.trim().toLowerCase()

    return users.filter((user) => {
      const roleMatch = filters.role === 'All' || user.role === filters.role
      const statusMatch = filters.status === 'All' || user.status === filters.status
      const searchMatch = !searchValue || user.name.toLowerCase().includes(searchValue)

      return roleMatch && statusMatch && searchMatch
    })
  },
)

export const selectSortedUsers = createSelector(
  [selectFilteredUsers, selectSorting],
  (users, sorting) => {
    const list = [...users]
    const { field, direction } = sorting
    const multiplier = direction === 'asc' ? 1 : -1

    list.sort((a, b) => {
      const rawA = normalizeForSort(a[field])
      const rawB = normalizeForSort(b[field])

      if (field === 'name') {
        return String(rawA).localeCompare(String(rawB)) * multiplier
      }

      const valueA = Number(rawA)
      const valueB = Number(rawB)
      return (valueA - valueB) * multiplier
    })

    return list
  },
)
