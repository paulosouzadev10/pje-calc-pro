import React, { useState, useEffect } from 'react'; // Adicionamos o useEffect aqui
import { supabase } from './supabaseClient';
import emailjs from '@emailjs/browser';


const Dashboard = ({ session }) => {
    const [abaAtiva, setAbaAtiva] = useState('novo'); // Começa mostrando 'Novo Pedido'
    const [loading, setLoading] = useState(false);
    const [processo, setProcesso] = useState('');
    const [prazo, setPrazo] = useState('');
    const [totalCalculos, setTotalCalculos] = useState(0); // Para guardar a contagem

    // Função que busca no banco quantos cálculos o advogado já pediu
    const buscarContagem = async () => {
        const { count, error } = await supabase
            .from('calculos')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id);

        if (!error) setTotalCalculos(count || 0);
    };
    const [meusCalculos, setMeusCalculos] = useState([]);

    const carregarHistorico = async () => {
        const { data, error } = await supabase
            .from('calculos')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });

        if (!error) setMeusCalculos(data);
    };

    // Carrega a contagem assim que a página abre
    useEffect(() => {
        if (session?.user?.id) {
            buscarContagem();
            carregarHistorico();
        }
    }, [session]);
    const handleEnviarCalculo = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Envia para o Supabase
            const { error } = await supabase
                .from('calculos')
                .insert([{
                    numero_processo: processo,
                    prazo_fatal: prazo,
                    user_id: session.user.id,
                    status: 'pendente'
                }]);

            if (error) {
                alert('Erro no banco: ' + error.message);
                setLoading(false);
                return; // Para aqui se der erro
            }

            // 2. Se chegou aqui, deu certo no banco!
            alert('Solicitação enviada com sucesso!');

            // 3. Tenta enviar o e-mail (opcional, não trava o resto se falhar)
            const templateParams = {
                numero_processo: processo,
                prazo: prazo,
                email_cliente: session.user.email,
            };

            emailjs.send('service_u293hvv', 'ydpeq3f', templateParams, 'nOQrlYCrZ-WOlvjkn')
                .catch(err => console.error("Erro email:", err));

            // 4. ATUALIZA TUDO NA TELA
            setProcesso('');
            setPrazo('');
            await buscarContagem();   // Atualiza o contador de estrelas
            await carregarHistorico(); // Atualiza a tabela abaixo

        } catch (err) {
            console.error("Erro inesperado:", err);
        } finally {
            setLoading(false);
        }
    };
    // Lógica visual das estrelas (Gamificação)
    const renderEstrelas = () => {
        const estrelas = [];
        const meta = 5;
        const calculosAtuais = totalCalculos % 6; // Reinicia após o prêmio

        for (let i = 1; i <= meta; i++) {
            estrelas.push(
                <span key={i} style={{ fontSize: '2rem', color: i <= calculosAtuais ? '#fbbf24' : '#e5e7eb', marginRight: '5px' }}>
                    {i <= calculosAtuais ? '⭐' : '☆'}
                </span>
            );
        }
        return estrelas;
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
            {/* Sidebar */}
            <nav style={{ width: '260px', backgroundColor: '#1e293b', color: 'white', padding: '30px 20px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#60a5fa' }}><img src="./logo-pje.png" alt="" /></h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ padding: '12px 0', borderBottom: '1px solid #334155', cursor: 'pointer' }} onClick={() => setAbaAtiva('novo')}>📊 Novo Pedido</li>
                    <li style={{ padding: '12px 0', borderBottom: '1px solid #334155', cursor: 'pointer', color: '#94a3b8' }} onClick={() => setAbaAtiva('meus')}>📜 Meus Cálculos</li>
                    <li style={{ padding: '12px 0', marginTop: '40px', color: '#fb7185', cursor: 'pointer' }} onClick={() => supabase.auth.signOut()}>🚪 Sair</li>
                </ul>

            </nav>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                {/* ABA: NOVO PEDIDO */}
                {abaAtiva === 'novo' && (
                    <>
                        <header style={{ marginBottom: '40px' }}>
                            <h1>Olá, Usuário</h1>
                            <p style={{ color: '#64748b' }}>
                                Solicite seu cálculo trabalhista preenchendo os dados abaixo.
                            </p>
                        </header>

                        {/* Card de Estrelas */}
                        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#475569', fontSize: '0.9rem' }}>⭐ PROGRAMA DE FIDELIDADE</h4>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {renderEstrelas()}
                                <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>{totalCalculos} pedidos</span>
                            </div>
                        </div>

                        {/* Formulário */}
                        <section style={{ maxWidth: '600px', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <h2 style={{ marginBottom: '20px' }}>Nova Solicitação</h2>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Número do Processo</label>
                                <input type="text" value={processo} onChange={(e) => setProcesso(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Prazo Fatal</label>
                                <input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                            </div>
                            <button
                                onClick={handleEnviarCalculo}
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.7 : 1
                                }}
                            >
                                {loading ? 'Enviando...' : '🚀 Enviar para o Perito'}
                            </button>
                        </section>
                    </>
                )}

                {/* ABA: MEUS CÁLCULOS */}
                {abaAtiva === 'meus' && (
                    <section style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
                        <h2 style={{ marginBottom: '20px' }}>Meus Cálculos</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                                    <th style={{ padding: '12px' }}>Processo</th>
                                    <th style={{ padding: '12px' }}>Prazo</th>
                                    <th style={{ padding: '12px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meusCalculos.map((item) => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '12px' }}>{item.numero_processo}</td>
                                        <td style={{ padding: '12px' }}>{new Date(item.prazo_fatal).toLocaleDateString('pt-BR')}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{
                                                backgroundColor: item.status === 'concluído' ? '#dcfce7' : '#fef9c3',
                                                color: item.status === 'concluído' ? '#166534' : '#854d0e',
                                                padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                                            }}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {meusCalculos.length === 0 && (
                                    <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>Nenhuma solicitação encontrada.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                )}
            </main>
        </div >
    );
}
export default Dashboard;