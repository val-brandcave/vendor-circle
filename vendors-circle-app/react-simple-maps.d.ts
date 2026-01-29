declare module 'react-simple-maps' {
  import { ComponentType, SVGAttributes } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: any;
    width?: number;
    height?: number;
    className?: string;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string;
    children?: (args: { geographies: any[] }) => React.ReactNode;
  }

  export interface GeographyProps extends SVGAttributes<SVGPathElement> {
    geography: any;
    style?: any;
  }

  export interface ZoomableGroupProps {
    zoom?: number;
    center?: [number, number];
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void;
    children?: React.ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}
