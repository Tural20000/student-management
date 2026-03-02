import { useState } from 'react';
import { register } from '../api/auth.js';
import './Modal.css';

export default function RegisterModal({ onSuccess, onClose, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('İstifadəçi adı və şifrə boş ola bilməz');
      return;
    }
    if (password.length < 4) {
      setError('Şifrə ən azı 4 simvol olmalıdır');
      return;
    }
    setLoading(true);
    try {
      await register(username, password);
      onSuccess();
    } catch (err) {
      setError(err.response?.data || err.message || 'Qeydiyyat xətası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Qeydiyyat</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>İstifadəçi adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="İstifadəçi adını daxil edin"
              autoFocus
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Şifrə</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrəni daxil edin"
              disabled={loading}
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Qeydiyyat...' : 'Qeydiyyat ol'}
          </button>
          {onSwitchToLogin && (
            <p className="auth-switch">
              Artıq hesabınız var?{' '}
              <button type="button" className="link-btn" onClick={onSwitchToLogin}>
                Daxil olun
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
