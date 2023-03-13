export interface list {
  key: string;
  label: string;
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface listAvatar {
  key: string;
  label: string;
  icon: JSX.Element;
}
