import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import RegisterModal from './components/RegisterModal.jsx';
import LoginModal from './components/LoginModal.jsx';
import StudentTable from './components/StudentTable.jsx';
import './App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  if (isAuthenticated) {
    return <StudentTable />;
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h1>Tələbə İdarəetmə Sistemi</h1>
        <p className="subtitle">Davam etmək üçün qeydiyyat olun və daxil olun</p>

        {showRegister && (
          <RegisterModal
            onSuccess={handleRegisterSuccess}
            onClose={() => {}}
            onSwitchToLogin={handleShowLogin}
          />
        )}
        {showLogin && !showRegister && (
          <LoginModal
            onSuccess={handleLoginSuccess}
            onClose={() => {}}
            onSwitchToRegister={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
