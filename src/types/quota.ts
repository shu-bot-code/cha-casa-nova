export interface QuotaItem {
  id: string;
  nome: string;
  descricao: string;
  valorCota: number; // Ex: 50.00
  totalCotas: number; // Ex: 60 (para uma geladeira de 3000)
  cotasRecebidas: number; // Quantas já foram pagas
  imageUrl: string;
  pixCopiaEColaBase: string; // Chave pix ou código base
}