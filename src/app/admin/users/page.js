"use client";

import { useState } from "react";

const mockUsers = [
  { id: 1, name: "Sarah Johnson", email: "user@smartscan.ai", role: "customer", scans: 45, joined: "2024-12-15", status: "active", avatar: "👩‍⚕️" },
  { id: 2, name: "Mike Thompson", email: "mike@example.com", role: "customer", scans: 32, joined: "2025-01-20", status: "active", avatar: "👨" },
  { id: 3, name: "Emily Davis", email: "emily@example.com", role: "customer", scans: 67, joined: "2024-11-08", status: "active", avatar: "👩" },
  { id: 4, name: "James Wilson", email: "james@example.com", role: "customer", scans: 12, joined: "2025-03-10", status: "blocked", avatar: "👨‍💼" },
  { id: 5, name: "Lisa Chen", email: "lisa@example.com", role: "customer", scans: 89, joined: "2024-10-22", status: "active", avatar: "👩‍🔬" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");

  const toggleBlock = (id) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u));
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>👥 User Management</h2>

      <input className="input-field" style={{ width: "100%", marginBottom: 24 }}
        placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="table-container">
        <table>
          <thead>
            <tr><th></th><th>Name</th><th>Email</th><th>Scans</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td style={{ fontSize: "1.5rem" }}>{u.avatar}</td>
                <td style={{ fontWeight: 600 }}>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.scans}</td>
                <td>{u.joined}</td>
                <td><span className={`badge badge-${u.status === "active" ? "success" : "danger"}`}>{u.status}</span></td>
                <td>
                  <button className={`btn btn-sm ${u.status === "active" ? "btn-danger" : "btn-primary"}`}
                    onClick={() => toggleBlock(u.id)}>
                    {u.status === "active" ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
