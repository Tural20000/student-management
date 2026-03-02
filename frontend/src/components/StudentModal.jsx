import { useState, useEffect } from 'react';
import './Modal.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function StudentModal({ student, onSave, onClose }) {
  const isEdit = !!student;
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setName(student.name || '');
      setSurname(student.surname || '');
      setEmail(student.email || '');
      setAge(student.age?.toString() || '');
    }
  }, [student]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Ad boş ola bilməz';
    if (!surname.trim()) newErrors.surname = 'Soyad boş ola bilməz';
    if (!email.trim()) newErrors.email = 'Email boş ola bilməz';
    else if (!EMAIL_REGEX.test(email)) newErrors.email = 'Email düzgün formatda deyil';
    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum)) newErrors.age = 'Yaş daxil edilməlidir';
    else if (ageNum < 18) newErrors.age = 'Yaş 18-dən kiçik ola bilməz';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSave({
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        age: parseInt(age, 10),
      });
      onClose();
    } catch (err) {
      if (err.response?.data && Array.isArray(err.response.data)) {
        const backendErrors = {};
        err.response.data.forEach(({ field, message }) => {
          backendErrors[field] = message;
        });
        setErrors(backendErrors);
      } else {
        setErrors({ general: err.response?.data || 'Xəta baş verdi' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? 'Tələbəni redaktə et' : 'Tələbə əlavə et'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ad *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ad"
              disabled={loading}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Soyad *</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Soyad"
              disabled={loading}
            />
            {errors.surname && <span className="field-error">{errors.surname}</span>}
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              disabled={loading}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Yaş *</label>
            <input
              type="number"
              min="18"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="18"
              disabled={loading}
            />
            {errors.age && <span className="field-error">{errors.age}</span>}
          </div>
          {errors.general && <p className="error-text">{errors.general}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Ləğv et
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saxlanılır...' : isEdit ? 'Yenilə' : 'Əlavə et'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
