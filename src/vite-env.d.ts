/// <reference types="vite/client" />
import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                'camera-controls'?: string | boolean;
                'auto-rotate'?: string | boolean;
                'auto-rotate-delay'?: string | number;
                'rotation-per-second'?: string;
                'shadow-intensity'?: string | number;
                'disable-zoom'?: string | boolean;
                'interaction-prompt'?: string;
                poster?: string;
                loading?: 'auto' | 'lazy' | 'eager';
                alt?: string;
                exposure?: string | number;
                'environment-image'?: string;
                'camera-orbit'?: string;
            };
        }
    }
}
