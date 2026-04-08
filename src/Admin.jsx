import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const Admin = () => {
  const [todosCalculos, setTodosCalculos] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // 'todos', 'pendente' ou 'concluído'

  const carregarTodosOsCalculos = async () => {
    const { data, error } = await supabase
      .from('calculos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setTodosCalculos(data);
  };

  // Filtra a lista antes de mostrar na tela
  
  const calculosFiltrados = (todosCalculos || []).filter(c => {
    if (filtro === 'todos') return true;
    if (!c.status) return false;

    const statusFormatado = c.status.toLowerCase();
    const filtroFormatado = filtro.toLowerCase().replace('s', '');

    return statusFormatado.includes(filtroFormatado);
  });
  const alterarStatus = async (id, novoStatus) => {
    const { error } = await supabase
      .from('calculos')
      .update({ status: novoStatus })
      .eq('id', id);

    if (!error) carregarTodosOsCalculos(); // Atualiza a lista na hora
  };

  useEffect(() => {
    carregarTodosOsCalculos();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h2 style={{ color: '#1e293b' }}>Painel do Administrador (Gestão de Pedidos)</h2>
      {/* Botões de Filtro */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setFiltro('todos')} style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #cbd5e1', cursor: 'pointer', backgroundColor: filtro === 'todos' ? '#1e293b' : 'white', color: filtro === 'todos' ? 'white' : 'black' }}>Todos</button>
        <button onClick={() => setFiltro('pendente')} style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #cbd5e1', cursor: 'pointer', backgroundColor: filtro === 'pendente' ? '#f59e0b' : 'white', color: filtro === 'pendente' ? 'white' : 'black' }}>Pendentes ⏳</button>
        <button onClick={() => setFiltro('concluído')} style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #cbd5e1', cursor: 'pointer', backgroundColor: filtro === 'concluído' ? '#16a34a' : 'white', color: filtro === 'concluído' ? 'white' : 'black' }}>Concluídos ✅</button>
      </div>

      <table style={{ width: '100%', backgroundColor: 'white', borderRadius: '12px', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9', color: '#64748b' }}>
            <th style={{ padding: '15px' }}>Processo</th>
            <th style={{ padding: '15px' }}>Status Atual</th>
            <th style={{ padding: '15px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {calculosFiltrados.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '15px' }}>{c.numero_processo}</td>
              <td style={{ padding: '15px' }}>
                <span style={{
                  backgroundColor: c.status === 'concluído' ? '#dcfce7' : '#fef9c3',
                  padding: '5px 10px', borderRadius: '5px', fontSize: '0.8rem'
                }}>
                  {c.status.toUpperCase()}
                </span>
              </td>
              <td style={{ padding: '15px' }}>
                {c.status === 'pendente' ? (
                  <button
                    onClick={() => alterarStatus(c.id, 'concluído')}
                    style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Marcar como Concluído ✅
                  </button>
                ) : (
                  <button
                    onClick={() => alterarStatus(c.id, 'pendente')}
                    style={{ backgroundColor: '#64748b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Reabrir Pedido 🔄
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;