import { useEffect, useMemo, useState } from 'react'
import { ROLES, STATUSES } from '../utils/helpers'

const initialForm = {
  name: '',
  email: '',
  role: 'User',
  status: 'Active',
  age: '',
}

function UserFormModal({ isOpen, onClose, onSubmit, selectedUser }) {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name ?? '',
        email: selectedUser.email ?? '',
        role: selectedUser.role ?? 'User',
        status: selectedUser.status ?? 'Active',
        age: selectedUser.age ?? '',
      })
      setErrors({})
      return
    }

    setFormData(initialForm)
    setErrors({})
  }, [selectedUser, isOpen])

  const isEditMode = useMemo(() => Boolean(selectedUser), [selectedUser])

  if (!isOpen) return null

  const validate = () => {
    const nextErrors = {}

    if (!formData.name.trim()) nextErrors.name = 'Name is required.'
    if (!formData.email.trim()) nextErrors.email = 'Email is required.'
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = 'Email format is invalid.'
    }

    const ageNumber = Number(formData.age)
    if (formData.age === '' || Number.isNaN(ageNumber)) {
      nextErrors.age = 'Age is required and must be a number.'
    } else if (ageNumber < 18 || ageNumber > 100) {
      nextErrors.age = 'Age must be between 18 and 100.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      role: formData.role,
      status: formData.status,
      age: Number(formData.age),
    })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{isEditMode ? 'Edit User' : 'Add User'}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            Close
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-slate-600">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(event) => handleChange('name', event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => handleChange('email', event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="text-sm text-slate-600">Role</label>
              <select
                value={formData.role}
                onChange={(event) => handleChange('role', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-600">Status</label>
              <select
                value={formData.status}
                onChange={(event) => handleChange('status', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-600">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(event) => handleChange('age', event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
              {errors.age && <p className="mt-1 text-xs text-rose-600">{errors.age}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              {isEditMode ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserFormModal
