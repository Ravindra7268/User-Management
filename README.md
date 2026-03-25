# User Management Dashboard

A production-ready React dashboard for managing users entirely in client-side state using Redux Toolkit.
The app includes filtering, sorting, role-based table visibility, and full CRUD operations with a clean Tailwind UI.

## Features

- Dashboard layout with sidebar, header, filter card, and table card
- 50 local dummy users loaded from `src/data/sample.json`
- Combined role, status, and name filters with reset support
- Name and age sorting (ascending/descending)
- Add, edit, and delete user flows with modal dialogs
- Role-based column visibility by viewer role
- Empty-state UI when no records match filters
- Form validation for required fields and invalid input

## Tech Stack

- React (functional components only)
- JavaScript (no TypeScript)
- Redux Toolkit
- React-Redux
- Tailwind CSS
- Vite

## Folder Structure

```text
src/
  app/
    store.js
  features/
    users/
      userSlice.js
      userSelectors.js
  components/
    Sidebar.jsx
    Header.jsx
    FilterPanel.jsx
    UserTable.jsx
    UserRow.jsx
    UserFormModal.jsx
    DeleteModal.jsx
  pages/
    Dashboard.jsx
  data/
    sample.json
  utils/
    helpers.js
```

## Run the Project

```bash
npm install
npm run dev
```

## Architecture Decisions

- **Single source of truth in Redux**: users, filters, and sorting live together in a single slice.
- **No derived state storage**: filtered and sorted users are computed via memoized selectors.
- **Reusable UI building blocks**: layout, table, row, and modal components are separated for maintainability.
- **Performance-first rendering**: selectors and memoized components reduce avoidable re-renders.
- **Role-driven view rules**: column visibility is declaratively mapped for easy extension.
