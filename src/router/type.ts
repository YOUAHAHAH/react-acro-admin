export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  meta?: MetaProps;
  title?: string;
  frameSrc?: string;
}

export interface MetaProps {
  keepAlive?: boolean;
  requiresAuth?: boolean;
  title?: string;
  key?: string;
  rank?: number;
  isChildren?: boolean;
  icon?: any;
  frameSrc?: string;
  isOutsideLink?: boolean;
  isLink?: boolean;
  auth?: string[];
}
