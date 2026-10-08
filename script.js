const botaoTema = document.getElementById('botaoTema');

botaoTema.addEventListener('click', function () {
  document.documentElement.classList.toggle('escuro');

  if (document.documentElement.classList.contains('escuro')) {
    localStorage.setItem('tema', 'escuro');
  } else {
    localStorage.setItem('tema', 'claro');
  }
});

const botaoMenu = document.getElementById('botaoMenu');
const menu = document.getElementById('menu');

botaoMenu.addEventListener('click', function () {
  menu.classList.toggle('aberto');
});

const linksMenu = document.querySelectorAll('.menu a');
linksMenu.forEach(function (link) {
  link.addEventListener('click', function () {
    menu.classList.remove('aberto');
  });
});

const frases = [
  'Estudante do Colégio Cotemig',
  'Estudante do ensino médio',
  'Disponível para estágio',
  'HTML, CSS, JavaScript e C#',
  'Inglês avançado',
  'Sempre disposto a aprender'
];

const textoDigitado = document.getElementById('textoDigitado');
let fraseAtual = 0;
let letraAtual = 0;
let apagando = false;

function digitar() {
  const frase = frases[fraseAtual];

  if (apagando) {
    letraAtual--;
  } else {
    letraAtual++;
  }

  textoDigitado.textContent = frase.substring(0, letraAtual);

  let tempo = apagando ? 40 : 90; 

  if (!apagando && letraAtual === frase.length) {
    tempo = 1800;     
    apagando = true;
  } else if (apagando && letraAtual === 0) {
    apagando = false;
    fraseAtual = (fraseAtual + 1) % frases.length; 
    tempo = 400;
  }

  setTimeout(digitar, tempo);
}

digitar();


const elementosAnimados = document.querySelectorAll('.animar');

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');

      const barra = entrada.target.querySelector('.barra-preenchida');
      if (barra) {
        barra.style.width = barra.dataset.nivel + '%';
      }

      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

elementosAnimados.forEach(function (elemento) {
  observador.observe(elemento);
});


const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalTexto = document.getElementById('modalTexto');

function abrirModal(titulo, texto) {
  modalTitulo.textContent = titulo;
  modalTexto.textContent = texto;
  modal.classList.add('aberto');
}

function fecharModal() {
  modal.classList.remove('aberto');
}

document.getElementById('modalFechar').addEventListener('click', fecharModal);
document.getElementById('modalOk').addEventListener('click', fecharModal);

modal.addEventListener('click', function (evento) {
  if (evento.target === modal) {
    fecharModal();
  }
});

const campoNome = document.getElementById('nome');
const campoTelefone = document.getElementById('telefone');
const campoEmail = document.getElementById('email');
const campoMensagem = document.getElementById('mensagem');

campoNome.addEventListener('input', function () {
  let valor = campoNome.value;
  valor = valor.replace(/[^A-Za-zÀ-ÿ\s]/g, ''); 
  valor = valor.replace(/\s{2,}/g, ' ');       
  valor = valor.replace(/(^|\s)\S/g, function (letra) {
    return letra.toUpperCase();
  });
  campoNome.value = valor;
});

campoTelefone.addEventListener('input', function () {
  let numeros = campoTelefone.value.replace(/\D/g, ''); 
  numeros = numeros.substring(0, 11);                   

  let resultado = numeros;
  if (numeros.length > 2) {
    resultado = '(' + numeros.substring(0, 2) + ') ' + numeros.substring(2);
  }
  if (numeros.length > 7) {
    resultado = '(' + numeros.substring(0, 2) + ') ' + numeros.substring(2, 7) + '-' + numeros.substring(7);
  }
  campoTelefone.value = resultado;
});

campoEmail.addEventListener('input', function () {
  campoEmail.value = campoEmail.value.toLowerCase().replace(/\s/g, '');
});

const contador = document.getElementById('contador');
campoMensagem.addEventListener('input', function () {
  contador.textContent = campoMensagem.value.length;
});


const formulario = document.getElementById('formulario');

function mostrarErro(campo, idErro, mensagem) {
  document.getElementById(idErro).textContent = mensagem;
  if (mensagem) {
    campo.parentElement.classList.add('invalido');
  } else {
    campo.parentElement.classList.remove('invalido');
  }
}

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault(); 

  let valido = true;

  if (campoNome.value.trim().length < 3) {
    mostrarErro(campoNome, 'erroNome', 'Digite seu nome.');
    valido = false;
  } else {
    mostrarErro(campoNome, 'erroNome', '');
  }

  const digitosTelefone = campoTelefone.value.replace(/\D/g, '').length;
  if (digitosTelefone < 10) {
    mostrarErro(campoTelefone, 'erroTelefone', 'Digite um telefone com DDD.');
    valido = false;
  } else {
    mostrarErro(campoTelefone, 'erroTelefone', '');
  }

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(campoEmail.value)) {
    mostrarErro(campoEmail, 'erroEmail', 'Digite um e-mail válido.');
    valido = false;
  } else {
    mostrarErro(campoEmail, 'erroEmail', '');
  }

  if (campoMensagem.value.trim().length < 10) {
    mostrarErro(campoMensagem, 'erroMensagem', 'Escreva uma mensagem (mínimo 10 caracteres).');
    valido = false;
  } else {
    mostrarErro(campoMensagem, 'erroMensagem', '');
  }

  if (valido) {
    const primeiroNome = campoNome.value.trim().split(' ')[0];
    abrirModal(
      'Mensagem enviada!',
      'Obrigado, ' + primeiroNome + '! Recebi sua mensagem e vou responder em breve.'
    );
    formulario.reset();
    contador.textContent = '0';
  } else {
    abrirModal('Ops!', 'Confira os campos destacados em vermelho e tente novamente.');
  }
});


document.getElementById('ano').textContent = new Date().getFullYear();
