export const ROLES = ['Admin', 'User', 'Legal']
export const STATUSES = ['Active', 'Inactive']
export const VIEW_ROLES = ['Admin', 'Legal', 'User']

export const getRoleBadgeClass = (role) => {
  if (role === 'Admin') return 'bg-purple-100 text-purple-700'
  if (role === 'Legal') return 'bg-sky-100 text-sky-700'
  return 'bg-slate-200 text-slate-700'
}

export const getStatusBadgeClass = (status) => {
  if (status === 'Active') return 'bg-emerald-100 text-emerald-700'
  return 'bg-rose-100 text-rose-700'
}

export const normalizeForSort = (value) => {
  if (value === undefined || value === null || value === '') {
    return Number.POSITIVE_INFINITY
  }

  return value
}

export const getNextId = (users) => {
  const ids = users.map((user) => Number(user.id)).filter((id) => !Number.isNaN(id))
  return (ids.length ? Math.max(...ids) : 0) + 1
}
