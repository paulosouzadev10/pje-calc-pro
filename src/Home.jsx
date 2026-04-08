import React from 'react';
// Mude a linha abaixo para este caminho correto:
import logoPJE from './assets/logo-pje.png';
import imgInstagram from './assets/instagram.jpeg';
import imgWhatsapp from './assets/whatsapp.jpeg';

// ... restante do código ...

const Home = ({ aoClicarLogin }) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a', // Azul marinho profundo
      color: 'white',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      {/* Header / Logo */}
      <div style={{ marginBottom: '40px' }}>
        <img
          src={logoPJE}
          alt="PJE Calc Pro"
          style={{
            maxWidth: '450px',
            width: '70%',
            height: 'auto',
            marginBottom: '10px'
          }}
        />
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginTop: '10px' }}>
        </p>
      </div>

      {/* Cards de Benefícios */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: '20px',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1100px',
        marginBottom: '50px'
      }}>
        <div style={{ ...cardStyle, flex: 1 }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '15px' }}>⚡ Rapidez</h3>
          <p style={{ textAlign: 'justify', lineHeight: '1.6', margin: 0 }}>
            Entregamos seus cálculos em tempo recorde para cumprir seus prazos.
          </p>
        </div>

        <div style={{ ...cardStyle, flex: 1 }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '15px' }}>🎯 Precisão</h3>
          <p style={{ textAlign: 'justify', lineHeight: '1.6', margin: 0 }}>
            Cálculos revisados e prontos para anexar ao PJE.
          </p>
        </div>

        <div style={{ ...cardStyle, flex: 1 }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '15px' }}>⭐ Fidelidade</h3>
          <p style={{ textAlign: 'justify', lineHeight: '1.6', margin: 0 }}>
            Fidelidade 5+1: Ganhe 1 cálculo bônus a cada 5 pedidos realizados
          </p>
        </div>
      </div>

      {/* Botão de Chamada para Ação */}
      <button
        onClick={aoClicarLogin}
        style={{
          padding: '16px 40px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          backgroundColor: '#38bdf8',
          color: '#0f172a',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.4)',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        Solicite seu cálculo →
      </button>

      <footer style={{ marginTop: '80px', color: '#64748b', fontSize: '0.8rem' }}>
        © 2024 Paulo Lima Cálculos Judiciais. Todos os direitos reservados.
      </footer>

      {/* Redes Sociais Formais - Rodapé Esquerdo flutuante */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        zIndex: 9999
      }}>

        {/* Botão WhatsApp */}
        <a
          href="https://wa.me/5581981512766"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
          title="Fale no WhatsApp"
        >
          {/* IMAGEM DO WHATSAPP NO LUGAR DO EMOJI */}
          <img
            src={imgWhatsapp}
            alt="WhatsApp"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '4px', // Suaviza os cantos da imagem
              objectFit: 'cover', // Garante que a imagem preencha o espaço sem distorcer
              filter: 'grayscale(30%) brightness(1.2)' // Filtro leve para uniformizar com o estilo formal
            }}
          />
        </a>

        {/* Botão Instagram */}
        <a
          href="https://instagram.com/pje_calc_pro"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
          title="Siga no Instagram"
        >
          {/* IMAGEM DO INSTAGRAM NO LUGAR DO EMOJI */}
          <img
            src={imgInstagram}
            alt="Instagram"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              objectFit: 'cover',
              filter: 'grayscale(30%) brightness(1.2)' // Filtro sutil
            }}
          />
        </a>

      </div>

    </div>


  );
};

const cardStyle = {
  backgroundColor: '#1e293b',
  padding: '25px',
  borderRadius: '16px',
  width: '250px',
  border: '1px solid #334155',
  textAlign: 'left'
};

export default Home;