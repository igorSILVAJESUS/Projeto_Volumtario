

(function() {
  const STORAGE_KEY = 'recreio_solidario_voluntarios';
  let voluntarios = [];

  function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        voluntarios = JSON.parse(stored);
      } catch(e) {
        voluntarios = [];
      }
    } else {
    
      voluntarios = [
        { nome: "Ana Clara", idade: 16, email: "ana@escola.com", turma: "2° Médio", atividade: "Esportes" },
        { nome: "Lucas Mendes", idade: 15, email: "lucas@escola.com", turma: "1° Médio", atividade: "Jogos" }
      ];
      saveToStorage();
    }
    updateCounterDisplay();
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(voluntarios));
  }


  function updateCounterDisplay() {
    const contadorSpan = document.getElementById('contador');
    if (contadorSpan) {
      contadorSpan.innerText = voluntarios.length;
    }
  }

  
  function addVoluntario(nome, idade, email, turma, atividade) {
  
    const existe = voluntarios.some(v => v.email.toLowerCase() === email.toLowerCase());
    if (existe) {
      return { 
        success: false, 
        message: '⚠️ Este e-mail já está inscrito! Utilize outro e-mail ou contate a coordenação.' 
      };
    }

    const novo = {
      nome: nome.trim(),
      idade: parseInt(idade),
      email: email.trim(),
      turma: turma.trim(),
      atividade: atividade || 'Não especificada'
    };
    
    voluntarios.push(novo);
    saveToStorage();
    updateCounterDisplay();
    return { 
      success: true, 
      message: '🎉 Inscrição confirmada! Seja bem-vindo(a) ao Recreio Solidário 💙🧡' 
    };
  }

  
  const form = document.getElementById('formVoluntario');
  const msgDiv = document.getElementById('mensagem');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const idade = document.getElementById('idade').value.trim();
      const email = document.getElementById('email').value.trim();
      const turma = document.getElementById('turma').value.trim();
      const atividade = document.getElementById('atividade').value;

      
      if (!nome || !idade || !email || !turma) {
        msgDiv.innerHTML = '<span style="color:#d9534f;">❌ Por favor, preencha todos os campos obrigatórios.</span>';
        return;
      }
      
      if (isNaN(idade) || idade < 6 || idade > 120) {
        msgDiv.innerHTML = '<span style="color:#d9534f;">📛 Idade inválida. Digite uma idade válida (6 a 120 anos).</span>';
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        msgDiv.innerHTML = '<span style="color:#d9534f;">📧 Digite um e-mail válido.</span>';
        return;
      }

      const result = addVoluntario(nome, idade, email, turma, atividade);
      
      if (result.success) {
        msgDiv.innerHTML = `<span style="color:#0B3B5F; background:#EFF7FF; padding:0.6rem 1rem; border-radius:50px; display:inline-block;">✅ ${result.message}</span>`;
        form.reset();
        
        
        setTimeout(() => {
          if (msgDiv) msgDiv.innerHTML = '';
        }, 4000);
      } else {
        msgDiv.innerHTML = `<span style="color:#d9534f;">${result.message}</span>`;
      }
    });
  }
 
  loadFromStorage();

  document.querySelectorAll('nav a, .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
})();