export interface ItemDTO {
  name: string;
  value: string;
  new: boolean;
  uri: string;
  user?: string;
}

export interface ItemCardDTO {
  item: ItemDTO;
}
