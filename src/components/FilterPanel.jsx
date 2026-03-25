import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetFilters,
  setRoleFilter,
  setSearchFilter,
  setStatusFilter,
} from '../features/users/userSlice'
import { selectFilters } from '../features/users/userSelectors'
import { ROLES, STATUSES } from '../utils/helpers'

const FilterPanel = memo(function FilterPanel() {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Filters</h3>
        <button
          type="button"
          onClick={() => dispatch(resetFilters())}
          className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="text-sm text-slate-600">
          Search Name
          <input
            type="text"
            value={filters.search}
            onChange={(event) => dispatch(setSearchFilter(event.target.value))}
            placeholder="Search by name"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none"
          />
        </label>

        <label className="text-sm text-slate-600">
          Role
          <select
            value={filters.role}
            onChange={(event) => dispatch(setRoleFilter(event.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none"
          >
            <option value="All">All Roles</option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-600">
          Status
          <select
            value={filters.status}
            onChange={(event) => dispatch(setStatusFilter(event.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
})

export default FilterPanel
