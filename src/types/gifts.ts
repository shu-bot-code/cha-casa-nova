export type Category = "cozinha" | "mesa_preparo" | "quarto" | "banheiro" | "lavanderia_limpeza" | "ferramentas" | "todos";

export interface Gift {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  valorSugerido: string;
  status: "disponivel" | "presenteado";
  imageUrl: string;
  pixQrCodeImageUrl: string;
  pixCopiaECola: string;
}