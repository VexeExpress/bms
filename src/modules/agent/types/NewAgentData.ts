export interface NewAgentData {
  name: string;
  code: string;
  phone: string;
  note: string;
  address: string;
  discountTicket: string;
  discountTicketType: number; // 1: Phần trăm. 2: Số tiền
  discountGoods: string;
  discountGoodsType: number; // 1: Phần trăm. 2: Số tiền
}
