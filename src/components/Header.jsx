import { useDispatch } from 'react-redux'
import { setRoleFilter } from '../features/users/userSlice'
import { VIEW_ROLES } from '../utils/helpers'

function Header({ viewRole, onViewRoleChange, onAddUser }) {
  const dispatch = useDispatch()

  const handleViewRoleChange = (event) => {
    const role = event.target.value
    onViewRoleChange(role)
    dispatch(setRoleFilter('All'))
  }

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">User Management Dashboard</h2>
        <p className="text-sm text-slate-500">Manage, filter, and update users in-memory.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-slate-600">
          View Role
          <select
            className="ml-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 focus:border-slate-500 focus:outline-none"
            value={viewRole}
            onChange={handleViewRoleChange}
          >
            {VIEW_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={onAddUser}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add User
        </button>
      </div>
    </header>
  )
}

export default Header
