function DeleteModal({ isOpen, user, onClose, onConfirm }) {
  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">Delete User</h3>
        <p className="mt-2 text-sm text-slate-600">
          Are you sure you want to delete <span className="font-medium text-slate-900">{user.name}</span>?
          This action cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
