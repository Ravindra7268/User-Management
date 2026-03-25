const navItems = ['Dashboard', 'Organizations']

function Sidebar() {
  return (
    <aside className="w-full border-r border-slate-200 bg-white lg:w-64">
      <div className="border-b border-slate-200 px-6 py-5">
        <h1 className="text-lg font-semibold text-slate-900">User Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Management Console</p>
      </div>
      <nav className="space-y-2 p-4">
        {navItems.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
              index === 0
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
