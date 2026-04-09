import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Login from './Login';
import Dashboard from './Dashboard';
import Admin from './Admin';
import Home from './Home'; // Certifique-se que o arquivo é Home.jsx
import CentralExemplos from './ExemplosCalculos';

function App() {
  const [session, setSession] = useState(null);
  const [telaAtual, setTelaAtual] = useState('dashboard');
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarExemplos, setMostrarExemplos] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      {!session ? (
        // --- SE NÃO ESTIVER LOGADO ---
        mostrarLogin ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMostrarLogin(false)}
              style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, padding: '10px', cursor: 'pointer', background: 'white', borderRadius: '5px', border: 'none' }}
            >
              ← Voltar para Home
            </button>
            <Login />
          </div>
          // ... seu código anterior
       ) : (
      <>
        {/* 1. A sua Home com as duas funções de clique */}
        <Home 
          aoClicarLogin={() => setMostrarLogin(true)} 
          aoClicarExemplos={() => setMostrarExemplos(true)} 
        />

        {/* 2. O Modal que só aparece quando 'mostrarExemplos' for true */}
        {mostrarExemplos && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <div style={{ 
              backgroundColor: 'white', padding: '30px', borderRadius: '15px', 
              maxWidth: '90%', maxHeight: '85%', overflowY: 'auto', position: 'relative',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            }}>
              <button 
                onClick={() => setMostrarExemplos(false)}
                style={{ position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', border: 'none', background: '#eee', borderRadius: '50%', width: '30px', height: '30px', color: '#000', fontWeight: 'bold' }}
              >
                X
              </button>
              
              {/* Aqui dentro chamamos o seu arquivo de PDFs */}
              <CentralExemplos />
            </div>
          </div>
        )}
      </>
    )

        // ... resto do código
      ) : (
        // --- SE ESTIVER LOGADO ---
        <>
          {/* Botão de Admin (Só aparece para você) */}
          {session.user.email === 'advpaulolima1@gmail.com' && (
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
              <button
                onClick={() => setTelaAtual(telaAtual === 'dashboard' ? 'admin' : 'dashboard')}
                style={{ padding: '12px 24px', backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {telaAtual === 'dashboard' ? 'Painel Admin 🔐' : 'Voltar ao Início 🏠'}
              </button>
            </div>
          )}

          {/* Troca de Telas */}
          {telaAtual === 'dashboard' ? (
            <Dashboard session={session} />
          ) : (
            <Admin />
          )}
        </>
      )}
    </div>
  );
}

export default App;