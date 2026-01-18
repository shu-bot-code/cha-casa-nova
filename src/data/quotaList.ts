// Usamos 'import type' para evitar erros de compilação no Fedora
import type { QuotaItem } from "../types/quota";

export const quotaList: QuotaItem[] = [
  {
    id: "geladeira",
    nome: "Geladeira",
    descricao: "O coração da cozinha! Ajude-nos a manter nossas comidinhas sempre frescas.",
    valorCota: 100,
    totalCotas: 35,
    cotasRecebidas: 11,
    imageUrl: "https://i.ibb.co/RpLTd65C/geladeira.png",
    pixQrCodeImageUrl: "https://i.ibb.co/2YcVrmM2/qrcotageladeira.png", 
    pixCopiaECola: "00020126820014br.gov.bcb.pix01369dd78aeb-2c71-414b-8a75-1efcf12d01090220Valor total de cotas5204000053039865802BR5925WALLYSON SCHUMACHER AQUIN6008BRASILIA62520514CotasGeladeira50300017br.gov.bcb.brcode01051.0.06304B7CB" 
  },
  {
    id: "lavadora",
    nome: "Máquina de Lavar",
    descricao: "Praticidade para os dias de chuva e roupas sempre cheirosas.",
    valorCota: 100,
    totalCotas: 43,
    cotasRecebidas: 0,
    imageUrl: "https://i.ibb.co/nsT1j7rj/maquinadelavar.png",
    pixQrCodeImageUrl: "https://i.ibb.co/SDrtXyhf/qrcotamaquinadelavar.png",
    pixCopiaECola: "00020126820014br.gov.bcb.pix01369dd78aeb-2c71-414b-8a75-1efcf12d01090220Valor total de cotas5204000053039865802BR5925WALLYSON SCHUMACHER AQUIN6008BRASILIA62570519CotasMaquinaDeLavar50300017br.gov.bcb.brcode01051.0.06304CE47"
  },
  {
    id: "smart_tv",
    nome: "Smart TV",
    descricao: "Para nossas noites de cinema, séries e videogame no sofá da casa nova!",
    valorCota: 41,
    totalCotas: 75,
    cotasRecebidas: 0,
    imageUrl: "https://i.ibb.co/dw7640yx/tv.png",
    pixQrCodeImageUrl: "https://i.ibb.co/2YcVrmM2/qrcotageladeira.png", 
    pixCopiaECola: "00020126820014br.gov.bcb.pix01369dd78aeb-2c71-414b-8a75-1efcf12d01090220Valor total de cotas5204000053039865802BR5925WALLYSON SCHUMACHER AQUIN6008BRASILIA62520514CotasGeladeira50300017br.gov.bcb.brcode01051.0.06304B7CB"
  }
];
