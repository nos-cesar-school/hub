// Conteúdo da home e da página de integrantes. Textos da equipe; o que falta aparece como "A CONFIRMAR".
export const TBC = '<span class="tbc">A CONFIRMAR</span>';

export const FRENTES = [
  { id: 'dev', nome: 'Desenvolvimento', desc: 'Transforma necessidades em interfaces, serviços e integrações. Implementa, testa e mantém o software para que as soluções possam evoluir.', fit: 'você gosta de colocar ideias para funcionar em código.' },
  { id: 'ciber', nome: 'Cibersegurança', desc: 'Incorpora segurança e privacidade desde o início. Identifica riscos e protege sistemas e dados.', fit: 'você gosta de pensar no que pode dar errado antes que dê.' },
  { id: 'design', nome: 'Design UX/UI', desc: 'Investiga necessidades, estrutura jornadas e cria experiências claras, úteis e acessíveis.', fit: 'você gosta de entender pessoas e transformar isso em interface.' },
  { id: 'infra', nome: 'Infraestrutura', desc: 'Cuida de hospedagem, servidores e automação, junto com Cibersegurança, para que tudo vá ao ar com segurança.', fit: 'você gosta de entender o que sustenta um sistema por trás da tela.' },
  { id: 'gestao', nome: 'Gestão', desc: 'Organiza planejamento, documentação e acompanhamento dos projetos, e conecta as equipes.', fit: 'você gosta de fazer as coisas andarem e as pessoas se entenderem.' },
];
export const F = Object.fromEntries(FRENTES.map((f) => [f.id, f]));

// Lista das Equipes (nov/26). Quem aparece em duas equipes fica na interseção.
// x, y = posição no diagrama horizontal (1000 × 480).
export const PESSOAS = [
  { id: 'rayanne', nome: 'Rayanne', frentes: ['design'], x: 160, y: 185 },
  { id: 'alice', nome: 'Alice', frentes: ['design'], x: 160, y: 295 },
  { id: 'laura', nome: 'Laura', frentes: ['design', 'dev'], x: 365, y: 240,
    curso: 'Gestão de Tecnologia da Informação',
    bio: 'Estudante de Gestão de Tecnologia da Informação na CESAR School e designer formada. Passei os últimos anos trabalhando como designer e hoje estou em transição de carreira para a tecnologia, com foco em dados.',
    interesses: 'pintura, piano, cinema, mapas e gráficos, geopolítica e a intersecção entre saúde e tecnologia' },
  { id: 'gabriel', nome: 'Gabriel', frentes: ['dev'], x: 500, y: 240 },
  { id: 'jader', nome: 'Jader', frentes: ['dev', 'ciber'], x: 635, y: 150 },
  { id: 'claudemir', nome: 'Claudemir', frentes: ['dev', 'ciber'], x: 635, y: 240 },
  { id: 'luiz', nome: 'Luiz', frentes: ['dev', 'ciber'], x: 635, y: 330 },
  { id: 'jessica', nome: 'Jessica', frentes: ['ciber'], x: 780, y: 135 },
  { id: 'saulo', nome: 'Saulo', frentes: ['ciber'], x: 780, y: 240 },
  { id: 'alexandre', nome: 'Alexandre', frentes: ['ciber'], x: 780, y: 345 },
  { id: 'mirna', nome: 'Mirna', frentes: ['ciber'], x: 885, y: 185 },
  { id: 'joao', nome: 'Joao', frentes: ['ciber'], x: 885, y: 295 },
];
// Posições no diagrama vertical (480 × 1000), pensadas para caber o nome embaixo de cada pessoa
export const VPOS = {
  rayanne: [170, 175], alice: [310, 175], laura: [240, 365], gabriel: [150, 500],
  jader: [160, 625], claudemir: [240, 625], luiz: [320, 625],
  jessica: [140, 775], saulo: [240, 775], alexandre: [340, 775], mirna: [190, 870], joao: [290, 870],
};
export const COMITE = [
  { id: 'idinaldo', nome: 'Idinaldo', cargo: 'Presidente', frentes: [] },
  { id: 'brenna', nome: 'Brenna', cargo: 'Vice-presidente', frentes: [] },
];
// Uma vaga de liderança por frente com integrantes, até os nomes serem confirmados
export const LIDERANCAS = ['design', 'dev', 'ciber'];
export const ZONAS = [
  { id: 'design', cx: 230, cy: 240, r: 200 },
  { id: 'dev', cx: 500, cy: 240, r: 200 },
  { id: 'ciber', cx: 770, cy: 240, r: 200 },
];
export const FAQ = [
  ['Posso participar de mais de uma frente?', 'Sim. Há integrantes que atuam em mais de uma.'],
  ['Quem pode trazer um projeto?', 'Universidades, empresas e organizações da sociedade civil.'],
  ['O código é aberto mesmo?', 'Sim. Tudo o que construímos fica no GitHub do Núcleo.'],
  ['Preciso saber programar para participar?', null],
  ['Preciso ser estudante da CESAR School?', null],
  ['A participação conta como atividade complementar?', null],
];
