export interface ItemDTO {
  name: string;
  value: string;
  new: boolean;
  uri: string;
  user?: string;
  id: string;
}

export interface ItemCardDTO {
  item: ItemDTO;
}
