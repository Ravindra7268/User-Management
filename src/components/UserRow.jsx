import { memo } from 'react'
import { getRoleBadgeClass, getStatusBadgeClass } from '../utils/helpers'

const UserRow = memo(function UserRow({ user, columns, onEdit, onDelete }) {
  return (
    <tr className="transition hover:bg-slate-50">
      {columns.name && <td className="px-4 py-3 text-sm font-medium text-slate-900">{user.name}</td>}
      {columns.email && <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>}
      {columns.role && (
        <td className="px-4 py-3 text-sm text-slate-700">
          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getRoleBadgeClass(user.role)}`}>
            {user.role}
          </span>
        </td>
      )}
      {columns.status && (
        <td className="px-4 py-3 text-sm">
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(user.status)}`}
          >
            {user.status}
          </span>
        </td>
      )}
      {columns.age && <td className="px-4 py-3 text-sm text-slate-600">{user.age ?? '-'}</td>}
      {columns.actions && (
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(user)}
              className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(user)}
              className="rounded-md border border-rose-300 px-2 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
            >
              Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  )
})

export default UserRow
