import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '../api/students.js';
import StudentModal from './StudentModal.jsx';
import './StudentTable.css';

function formatDate(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleString('az-AZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export default function StudentTable() {
  const { logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err.response?.status === 401 ? 'Səssiyanız sona çatıb. Yenidən daxil olun.' : 'Məlumatlar gətirilə bilmədi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (data) => {
    const created = await createStudent(data);
    setStudents((prev) => [...prev, created]);
    setShowAddModal(false);
  };

  const handleUpdateStudent = async (data) => {
    const updated = await updateStudent(editingStudent.id, data);
    setStudents((prev) => prev.map((s) => (s.id === editingStudent.id ? updated : s)));
    setEditingStudent(null);
  };

  const handleDeleteStudent = async (id) => {
    if (!confirm('Bu tələbəni silmək istədiyinizə əminsiniz?')) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.response?.data || 'Silinə bilmədi');
    }
  };

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h1>Tələbə İdarəetməsi</h1>
        <button className="btn btn-logout" onClick={logout}>
          Çıxış
        </button>
      </header>

      <div className="toolbar">
        <button className="btn btn-add" onClick={() => setShowAddModal(true)}>
          + Tələbə əlavə et
        </button>
      </div>

      {error && <p className="error-banner">{error}</p>}
      {loading ? (
        <p className="loading">Yüklənir...</p>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Email</th>
                <th>Yaş</th>
                <th>Yaradılma tarixi</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-row">
                    Tələbə tapılmadı
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.surname}</td>
                    <td>{s.email}</td>
                    <td>{s.age}</td>
                    <td>{formatDate(s.created_at)}</td>
                    <td>
                      <button
                        className="btn-action btn-edit"
                        onClick={() => setEditingStudent(s)}
                        title="Redaktə et"
                      >
                        Redaktə et
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDeleteStudent(s.id)}
                        title="Sil"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <StudentModal
          onSave={handleAddStudent}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {editingStudent && (
        <StudentModal
          student={editingStudent}
          onSave={handleUpdateStudent}
          onClose={() => setEditingStudent(null)}
        />
      )}
    </div>
  );
}
