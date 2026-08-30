import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/auth/users',
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );

        console.log('Users API Response:', res.data);

        // Backend response:
        // { user: [...] }

        setUsers(res.data.user || []);

      } catch (error) {
        console.error(
          'Error fetching users:',
          error.response?.data || error.message
        );

        setUsers([]);

      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div style={containerStyle}>

      <h2
        style={{
          color: '#f97316',
          marginBottom: '20px'
        }}
      >
        User Directory
      </h2>

      {/* Loading */}
      {loading && (
        <p style={{ color: '#f97316' }}>
          Loading users...
        </p>
      )}

      {/* No Users */}
      {!loading && users.length === 0 && (
        <div
          style={{
            background: '#09090b',
            padding: '30px',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #27272a',
            color: '#a1a1aa'
          }}
        >
          No users found.
        </div>
      )}

      {/* Users Table */}
      {!loading && users.length > 0 && (
        <div style={{ overflowX: 'auto' }}>

          <table style={tableStyle}>

            <thead>
              <tr style={rowStyle}>

                <th style={thStyle}>
                  ID
                </th>

                <th style={thStyle}>
                  NAME
                </th>

                <th style={thStyle}>
                  EMAIL
                </th>

                <th style={thStyle}>
                  ROLE
                </th>

                <th style={thStyle}>
                  VERIFIED
                </th>

              </tr>
            </thead>

            <tbody>

              {users.map((u) => (

                <tr
                  key={u._id}
                  style={rowStyle}
                >

                  {/* ID */}
                  <td style={tdStyle}>
                    {u._id
                      ? `${u._id.substring(0, 8)}...`
                      : 'N/A'}
                  </td>

                  {/* Name */}
                  <td style={tdStyle}>
                    {u.name || 'N/A'}
                  </td>

                  {/* Email */}
                  <td style={tdStyle}>
                    {u.email || 'N/A'}
                  </td>

                  {/* Role */}
                  <td style={tdStyle}>

                    <span
                      style={{
                        background:
                          u.role === 'admin'
                            ? 'rgba(234,88,12,0.2)'
                            : 'rgba(16,185,129,0.2)',

                        color:
                          u.role === 'admin'
                            ? '#f97316'
                            : '#10b981',

                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {(u.role || 'user').toUpperCase()}
                    </span>

                  </td>

                  {/* Verified */}
                  <td style={tdStyle}>

                    <span
                      style={{
                        background: u.verified
                          ? 'rgba(16,185,129,0.15)'
                          : 'rgba(239,68,68,0.15)',

                        color: u.verified
                          ? '#10b981'
                          : '#ef4444',

                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {u.verified
                        ? 'VERIFIED'
                        : 'NOT VERIFIED'}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};


/* =========================
   STYLES
========================= */

const containerStyle = {
  maxWidth: '1200px',
  margin: '40px auto',
  padding: '30px',
  background: '#18181b',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.05)',
  color: '#fafafa',
  boxSizing: 'border-box'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '750px'
};

const rowStyle = {
  borderBottom:
    '1px solid rgba(255,255,255,0.1)'
};

const thStyle = {
  padding: '15px',
  textAlign: 'left',
  color: '#a1a1aa',
  fontSize: '0.9rem',
  fontWeight: '600'
};

const tdStyle = {
  padding: '15px',
  textAlign: 'left',
  color: '#fff'
};

export default AdminUsers;

