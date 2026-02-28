declare module "react-responsive-masonry" {
  import { ReactNode } from "react";

  interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    children: ReactNode;
  }

  interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: {
      [key: number]: number;
    };
    children: ReactNode;
  }

  const Masonry: React.FC<MasonryProps>;
  const ResponsiveMasonry: React.FC<ResponsiveMasonryProps>;

  export default Masonry;
  export { ResponsiveMasonry };
}