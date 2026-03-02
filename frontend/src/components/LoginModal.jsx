import { useState } from 'react';
import { login } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';
import './Modal.css';

export default function LoginModal({ onSuccess, onClose, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('İstifadəçi adı və şifrə boş ola bilməz');
      return;
    }
    setLoading(true);
    try {
      const data = await login(username, password);
      authLogin(data.jwt);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Daxil olma xətası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Daxil ol</h2>
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
            {loading ? 'Daxil olunur...' : 'Daxil ol'}
          </button>
          {onSwitchToRegister && (
            <p className="auth-switch">
              Hesabınız yoxdur?{' '}
              <button type="button" className="link-btn" onClick={onSwitchToRegister}>
                Qeydiyyat olun
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
