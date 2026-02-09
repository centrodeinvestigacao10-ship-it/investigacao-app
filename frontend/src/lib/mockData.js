export const alvosMock = [
  {
    id: "a1",
    nome: "Alvo A",
    cpf: "000.000.000-00",
    telefone: "+55 11 9xxxx-4321",
    risco: "Alto",
    operacao: "Operação Atlas"
  },
  {
    id: "a2",
    nome: "Alvo B",
    cpf: "111.111.111-11",
    telefone: "+55 21 9xxxx-7788",
    risco: "Médio",
    operacao: "Operação Delta"
  }
];

export const conexoesMock = [
  {
    id: "c1",
    origem_id: "a1",
    origem_tipo: "alvo",
    destino_id: "q1",
    destino_tipo: "qualificado",
    descricao: "Ligação telefônica"
  },
  {
    id: "c2",
    origem_id: "a2",
    origem_tipo: "alvo",
    destino_id: "a1",
    destino_tipo: "alvo",
    descricao: "Co-presença em ERB"
  }
];

export const erbsMock = [
  {
    id: "e1",
    operacao: "Operação Atlas",
    local: "Zona Sul",
    datahora: "2026-02-01T18:40:00Z",
    telefone: "+55 11 9xxxx-4321"
  },
  {
    id: "e2",
    operacao: "Operação Delta",
    local: "Zona Norte",
    datahora: "2026-02-02T08:12:00Z",
    telefone: "+55 21 9xxxx-7788"
  }
];

export const extratosMock = [
  {
    id: "x1",
    operacao: "Operação Atlas",
    telefone: "+55 11 9xxxx-4321",
    tipo: "chamada",
    datahora: "2026-02-02T10:15:00Z",
    numero_destino: "+55 11 9xxxx-0000"
  },
  {
    id: "x2",
    operacao: "Operação Delta",
    telefone: "+55 21 9xxxx-7788",
    tipo: "sms",
    datahora: "2026-02-02T12:40:00Z",
    numero_destino: "+55 21 9xxxx-1111"
  }
];

export const operacoesMock = [
  {
    id: "op1",
    nome: "Operação Atlas",
    status: "ativa",
    descricao: "Foco em vínculos regionais."
  },
  {
    id: "op2",
    nome: "Operação Delta",
    status: "ativa",
    descricao: "Extratos e ERBs prioritários."
  }
];

export const analisesMock = [
  {
    id: "an1",
    titulo: "Análise Atlas",
    operacao: "Operação Atlas",
    status: "em_andamento",
    resumo: "Vínculos críticos detectados."
  }
];

export const relatoriosMock = [
  {
    id: "re1",
    titulo: "Relatório Atlas",
    tipo: "vinculos",
    operacao: "Operação Atlas",
    status: "gerado"
  }
];
