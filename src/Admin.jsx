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
  const alterarStatusOrcamento = async (id, novoStatus) => {
  const { error } = await supabase
    .from('calculos')
    .update({ status_orcamento: novoStatus })
    .eq('id', id);

  if (!error) {
    // Atualiza a lista na tela imediatamente sem precisar esperar o banco
    const novosCalculos = todosCalculos.map(c => 
      c.id === id ? { ...c, status_orcamento: novoStatus } : c
    );
    setTodosCalculos(novosCalculos); 
    
    // Opcional: recarrega para garantir sincronia
    carregarTodosOsCalculos(); 
  } else {
    alert("Erro ao atualizar no banco!");
  }
};

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
            <th style={{ padding: '15px', textAlign: 'left' }}>Orçamento</th>
          </tr>
        </thead>
        <tbody>
          {calculosFiltrados.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>

              {/* COLUNA 1: PROCESSO */}
              <td style={{ padding: '15px' }}>
                <div style={{ fontWeight: 'bold' }}>{c.numero_processo}</div>
                {/* COLE O CÓDIGO AQUI ABAIXO */}
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {c.tipo_calculo || 'Tipo não informado'}
                </div>
              </td>

              {/* COLUNA 2: STATUS ATUAL */}
              <td style={{ padding: '15px' }}>
                <span style={{
                  backgroundColor: c.status === 'concluído' ? '#dcfce7' : '#fef9c3',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {c.status.toUpperCase()}
                </span>
              </td>

              {/* COLUNA 3: AÇÕES (BOTÕES) */}
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

              {/* COLUNA 4: ORÇAMENTO (O SELETOR) */}
              <td style={{ padding: '15px' }}>
                <select
                  value={c.status_orcamento || ''}
                  onChange={(e) => alterarStatusOrcamento(c.id, e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: c.status_orcamento === 'Orçamento Aprovado' ? '#dcfce7' : '#fff',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    width: '100%'
                  }}
                >
                  <option value="">Selecione o Status</option>
                  <option value="Orçamento Enviado">Orçamento Enviado</option>
                  <option value="Aguardando Aprovação">Aguardando Aprovação</option>
                  <option value="Orçamento Aprovado">Orçamento Aprovado</option>
                </select>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;