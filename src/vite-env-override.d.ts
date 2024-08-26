declare module '*.svg?react' {
  import type * as React from 'react';
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}
