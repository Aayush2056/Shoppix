import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/analytics',
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );

        setStats(res.data);

      } catch (error) {
        console.error(error);

        if (error.response?.status === 401) {
          navigate('/login');
          return;
        }

        setStats({
          totalOrders: 0,
          totalProducts: 0,
          totalUsers: 0,
          totalRevenue: 0
        });
      }
    };

    fetchStats();
  }, [user, navigate]);

  // Card CSS
  const cardStyle = {
    padding: '25px',
    background: '#18181b',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    minWidth: 0,
    overflow: 'hidden',
    boxSizing: 'border-box'
  };

  // Normal numbers
  const numberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#f97316',
    maxWidth: '100%',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word'
  };

  // Revenue number
  const revenueStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#10b981',
    maxWidth: '100%',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    lineHeight: '1.2'
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '5px'
        }}
      >
        <img
          src="/ShopNestLogo.png"
          alt="ShopNest Logo"
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '8px',
            objectFit: 'cover',
            filter:
              'drop-shadow(0 0px 10px rgba(249, 115, 22, 0.3))'
          }}
        />

        <h2 style={{ margin: 0 }}>
          Admin Dashboard
        </h2>
      </div>

      {/* Welcome */}
      <p
        style={{
          color: '#a1a1aa',
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}
      >
        Welcome back,{' '}
        <span style={{ color: '#fff' }}>
          {user?.name}
        </span>
      </p>

      {/* Statistics */}
      {stats ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            width: '100%'
          }}
        >

          {/* Total Orders */}
          <div style={cardStyle}>
            <h4
              style={{
                color: '#a1a1aa',
                fontSize: '1rem',
                margin: 0
              }}
            >
              Total Orders
            </h4>

            <div style={numberStyle}>
              {stats.totalOrders}
            </div>
          </div>

          {/* Total Products */}
          <div style={cardStyle}>
            <h4
              style={{
                color: '#a1a1aa',
                fontSize: '1rem',
                margin: 0
              }}
            >
              Total Products
            </h4>

            <div style={numberStyle}>
              {stats.totalProducts}
            </div>
          </div>

          {/* Total Users */}
          <div style={cardStyle}>
            <h4
              style={{
                color: '#a1a1aa',
                fontSize: '1rem',
                margin: 0
              }}
            >
              Total Users
            </h4>

            <div style={numberStyle}>
              {stats.totalUsers}
            </div>
          </div>

          {/* Total Revenue */}
          <div style={cardStyle}>
            <h4
              style={{
                color: '#a1a1aa',
                fontSize: '1rem',
                margin: 0
              }}
            >
              Total Revenue
            </h4>

            <div style={revenueStyle}>
              ₹{Number(stats.totalRevenue || 0).toFixed(2)}
            </div>
          </div>

        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            margin: '50px 0',
            color: '#f97316'
          }}
        >
          Loading metrics...
        </div>
      )}

      {/* Administrative Controls */}
      <div
        style={{
          marginTop: '40px',
          padding: '30px',
          background: '#18181b',
          borderRadius: '12px',
          border:
            '1px solid rgba(255,255,255,0.05)',
          boxSizing: 'border-box'
        }}
      >
        <h3
          style={{
            marginBottom: '25px',
            color: '#f97316'
          }}
        >
          Administrative Controls
        </h3>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/add-product')
            }
          >
            + Add Product
          </button>

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/products')
            }
            style={{
              background: '#3f3f46'
            }}
          >
            📦 Manage Products
          </button>

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/orders')
            }
            style={{
              background: '#3f3f46'
            }}
          >
            🚚 Manage Orders
          </button>

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/users')
            }
            style={{
              background: '#3f3f46'
            }}
          >
            👥 Users Directory
          </button>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;

