import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Dashboard from './Dashboard';

export default function Login() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f5f9' }}>
        <div style={{ maxWidth: '400px', width: '100%', padding: '40px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
          <h1 style={{ textAlign: 'center', color: '#1e293b', marginBottom: '24px' }}>Cálculos Trabalhistas</h1>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            additionalData={{
              nome: {
                type: 'text',
                label: 'Nome Completo',
                placeholder: 'Digite seu nome',
                required: true,
              },
            }}
          />
        </div>
      </div>
    );
  }
    return <Dashboard session={session} />;
}