export type TTextItem = {
  id: string;
  text: string;
  x: number;
  y: number;
  bold: boolean;
  italic: boolean;
  align: 'left' | 'center' | 'right';
};

export type TTextItemProps = {
  textData: TTextItem;
  onUpdate: (id: string, newData: Partial<TTextItem>) => void;
  onDelete: (id: string) => void;
  isActive: boolean;
  onSelect: (id: string) => void;
};
