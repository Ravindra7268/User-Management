import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import DeleteModal from '../components/DeleteModal'
import FilterPanel from '../components/FilterPanel'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import UserFormModal from '../components/UserFormModal'
import UserTable from '../components/UserTable'
import { addUser, deleteUser, updateUser } from '../features/users/userSlice'

const columnVisibilityByRole = {
  Admin: { name: true, email: true, role: true, status: true, age: true, actions: true },
  Legal: { name: true, email: true, role: true, status: true, age: false, actions: true },
  User: { name: true, email: false, role: true, status: true, age: false, actions: false },
}

function Dashboard() {
  const dispatch = useDispatch()
  const [viewRole, setViewRole] = useState('Admin')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const visibleColumns = useMemo(() => columnVisibilityByRole[viewRole], [viewRole])

  const openCreateModal = () => {
    setSelectedUser(null)
    setIsFormOpen(true)
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setIsFormOpen(true)
  }

  const closeFormModal = () => {
    setIsFormOpen(false)
    setSelectedUser(null)
  }

  const handleFormSubmit = (values) => {
    if (selectedUser) {
      dispatch(updateUser({ id: selectedUser.id, changes: values }))
    } else {
      dispatch(addUser(values))
    }

    closeFormModal()
  }

  const openDeleteModal = (user) => {
    setDeleteTarget(user)
    setIsDeleteOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteTarget(null)
    setIsDeleteOpen(false)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      dispatch(deleteUser(deleteTarget.id))
    }
    closeDeleteModal()
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Header viewRole={viewRole} onViewRoleChange={setViewRole} onAddUser={openCreateModal} />
          <main className="space-y-4 p-4 sm:p-6">
            <FilterPanel />
            <UserTable columns={visibleColumns} onEdit={openEditModal} onDelete={openDeleteModal} />
          </main>
        </div>
      </div>

      <UserFormModal
        isOpen={isFormOpen}
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
        selectedUser={selectedUser}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        user={deleteTarget}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default Dashboard
