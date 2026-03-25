import { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSortedUsers, selectSorting } from '../features/users/userSelectors'
import { setSorting } from '../features/users/userSlice'
import UserRow from './UserRow'

const UserTable = memo(function UserTable({ columns, onEdit, onDelete }) {
  const dispatch = useDispatch()
  const users = useSelector(selectSortedUsers)
  const sorting = useSelector(selectSorting)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  const visibleColumnCount = Object.entries(columns).reduce((count, [key, value]) => {
    if (key === 'actions') return count
    return count + (value ? 1 : 0)
  }, 0)
  const totalColumns = visibleColumnCount + (columns.actions ? 1 : 0)
  const totalPages = Math.max(1, Math.ceil(users.length / perPage))
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return users.slice(start, start + perPage)
  }, [users, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [users.length])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const renderSortArrow = (field) => {
    if (sorting.field !== field) return '↕'
    return sorting.direction === 'asc' ? '↑' : '↓'
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Users ({users.length})</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.name && (
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <button
                    type="button"
                    onClick={() => dispatch(setSorting({ field: 'name' }))}
                    className="inline-flex items-center gap-1 transition hover:text-slate-800"
                  >
                    Name {renderSortArrow('name')}
                  </button>
                </th>
              )}
              {columns.email && (
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>
              )}
              {columns.role && (
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Role
                </th>
              )}
              {columns.status && (
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              )}
              {columns.age && (
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <button
                    type="button"
                    onClick={() => dispatch(setSorting({ field: 'age' }))}
                    className="inline-flex items-center gap-1 transition hover:text-slate-800"
                  >
                    Age {renderSortArrow('age')}
                  </button>
                </th>
              )}
              {columns.actions && (
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <UserRow key={user.id} user={user} columns={columns} onEdit={onEdit} onDelete={onDelete} />
              ))
            ) : (
              <tr>
                <td colSpan={totalColumns} className="px-4 py-12 text-center text-sm text-slate-500">
                  No users found. Try adjusting filters or search input.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
        <p className="text-sm text-slate-600">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
})

export default UserTable
