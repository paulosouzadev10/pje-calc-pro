import React from 'react';
// Se não tiver ícones instalados, usaremos emojis que funcionam em qualquer lugar
const CentralExemplos = () => {
  const exemplos = [
    { 
      id: 1, 
      titulo: "calculo_de_horas_extras", 
      arquivo: "calculo_de_horas_extras.pdf", 
      detalhes: "Modelo com integração de DSR e reflexos em verbas rescisórias." 
    },
    { 
      id: 2, 
      titulo: "adicional_de_insalubridade", 
      arquivo: "adicional_de_insalubridade.pdf", 
      detalhes: "Exemplo completo de inicial com juros e correção monetária." 
    },
    { 
      id: 3, 
      titulo: "ferias", 
      arquivo: "ferias.pdf", 
      detalhes: "Cálculo focado em férias vencidas com acréscimo de 1/3." 
    },
    { 
      id: 4, 
      titulo: "verbas_rescisorias", 
      arquivo: "verbas_rescisorias.pdf", 
      detalhes: "Modelo de TRCT calculado com multas do Art. 467 e 477." 
    },
    { 
      id: 5, 
      titulo: "13_salario", 
      arquivo: "13_salario.pdf", 
      detalhes: "Apuração de 13º salário proporcional com base em período de trabalho." 
    },
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ borderLeft: '5px solid #2563eb', paddingLeft: '15px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#1e293b', margin: 0 }}>Modelos de Cálculos</h2>
        <p style={{ color: '#64748b', marginTop: '5px' }}>Baixe exemplos prontos para usar como base no seu PJE-Calc.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {exemplos.map((item) => (
          <div key={item.id} style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '2rem', marginBottom: '15px' }}>📄</div>
            <h3 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '1.2rem' }}>{item.titulo}</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', flexGrow: 1, marginBottom: '20px' }}>
              {item.detalhes}
            </p>
            
            <a 
              href={`/exemplos/${item.arquivo}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                textAlign: 'center',
                padding: '12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                display: 'block'
              }}
            >
              Visualizar Exemplo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CentralExemplos;