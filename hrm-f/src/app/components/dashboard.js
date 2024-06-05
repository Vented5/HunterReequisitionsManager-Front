import Head from 'next/head';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-whitesmoke">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <header className="header flex justify-between items-center">
        <nav className="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center text-gray-900">
          <div className="flex flex-wrap items-center space-x-8">
            <button href="#" className="nav-link">User Management</button>
            <button href="#" className="nav-link">Product Database</button>
            <button href="#" className="nav-link">Request Overview</button>
            <button href="#" className="nav-link">System Settings</button>
          </div>
          <div className="flex flex-wrap">
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
            />
          </div>
        </nav>
      </header>
      <main className="container">
        <section className="section">
          <h2 className="section-title">User Management</h2>
          <div className="mb-6">
            <h3 className="sub-section-title">User List</h3>
            <ul className="space-y-2">
              <li><ol href="#" className="link">John Doe</ol></li>
              <li><ol href="#" className="link">Jane Doe</ol></li>
              <li><ol href="#" className="link">Bob Smith</ol></li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="sub-section-title">Roles Management</h3>
            <p>Assign roles (Requester, Purchase Validator, Purchase Advisor, Admin)</p>
            <button className="button-primary">Manage Roles</button>
          </div>
          <div>
            <h3 className="sub-section-title">Activity Log</h3>
            <p>View user activity and changes made</p>
            <button className="button-secondary">View Log</button>
          </div>
        </section>
        <section className="section">
          <h2 className="section-title">Product Database</h2>
          <div>
            <h3 className="sub-section-title">Product List</h3>
            <ul className="space-y-2">
              <li><button href="#" className="link">Product 1</button></li>
              <li><button href="#" className="link">Product 2</button></li>
              <li><button href="#" className="link">Product 3</button></li>
            </ul>
            <button className="button-add">Add Product</button>
          </div>
        </section>
      </main>
    </div>
  );
}
