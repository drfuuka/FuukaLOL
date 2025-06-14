export type TTextItem = {
  id: string;
  text: string;
  x: number;
  y: number;
  scale: number;
  bold: boolean;
  italic: boolean;
  align: 'left' | 'center' | 'right';
};

export type TTextItemProps = {
  textData: TTextItem;
  isActive: boolean;
  trashRegion?: {
    x: number;
    y: number;
    radius: number;
  };
  onUpdate: (id: string, newData: Partial<TTextItem>) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  onTouchStart?: () => void;
  setIsTouchingText?: (value: boolean) => void;
};
