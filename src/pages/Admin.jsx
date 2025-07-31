import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import DataTable from '../components/DataTable';
import ErrorMessage from '../components/ErrorMessage';

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user?.role !== 'admin') return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: res } = await api.get('/admin/data');
        setData(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user?.role]);

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <DataTable data={data} />
    </div>
  );
};

export default Admin;