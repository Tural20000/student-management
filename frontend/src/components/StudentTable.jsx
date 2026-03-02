import { useState, useEffect, useMemo } from 'react';
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

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

export default function StudentTable() {
  const { logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(SORT_ASC);

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

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === SORT_ASC ? SORT_DESC : SORT_ASC));
    } else {
      setSortColumn(column);
      setSortDirection(SORT_ASC);
    }
  };

  const filteredAndSortedStudents = useMemo(() => {
    let list = students;
    if (searchName.trim()) {
      const term = searchName.trim().toLowerCase();
      list = list.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(term)) ||
          (s.surname && s.surname.toLowerCase().includes(term))
      );
    }
    if (sortColumn) {
      list = [...list].sort((a, b) => {
        let aVal = a[sortColumn];
        let bVal = b[sortColumn];
        if (sortColumn === 'created_at' && (aVal || bVal)) {
          aVal = aVal ? new Date(aVal).getTime() : 0;
          bVal = bVal ? new Date(bVal).getTime() : 0;
        }
        if (typeof aVal === 'string') {
          aVal = (aVal || '').toLowerCase();
          bVal = (bVal || '').toLowerCase();
          return sortDirection === SORT_ASC
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        if (aVal == null) aVal = sortDirection === SORT_ASC ? Infinity : -Infinity;
        if (bVal == null) bVal = sortDirection === SORT_ASC ? Infinity : -Infinity;
        return sortDirection === SORT_ASC ? (aVal > bVal ? 1 : -1) : (bVal > aVal ? 1 : -1);
      });
    }
    return list;
  }, [students, searchName, sortColumn, sortDirection]);

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return <span className="sort-icon">↕</span>;
    return (
      <span className="sort-icon sort-active">
        {sortDirection === SORT_ASC ? '↑' : '↓'}
      </span>
    );
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
        <input
          type="text"
          className="search-input"
          placeholder="Tələbə adına görə axtar..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {error && <p className="error-banner">{error}</p>}
      {loading ? (
        <p className="loading">Yüklənir...</p>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort('id')}>ID <SortIcon column="id" /></th>
                <th className="sortable" onClick={() => handleSort('name')}>Ad <SortIcon column="name" /></th>
                <th className="sortable" onClick={() => handleSort('surname')}>Soyad <SortIcon column="surname" /></th>
                <th className="sortable" onClick={() => handleSort('email')}>Email <SortIcon column="email" /></th>
                <th className="sortable" onClick={() => handleSort('age')}>Yaş <SortIcon column="age" /></th>
                <th className="sortable" onClick={() => handleSort('created_at')}>Yaradılma tarixi <SortIcon column="created_at" /></th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-row">
                    Tələbə tapılmadı
                  </td>
                </tr>
              ) : (
                filteredAndSortedStudents.map((s) => (
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
