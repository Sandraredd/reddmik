import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Safety guard: Monkey-patch JSON.stringify to prevent "Circular structure to JSON" errors
// which occur when environment tools try to serialize DOM elements or React internal objects.
(function() {
  const originalStringify = JSON.stringify;
  JSON.stringify = function(value: any, replacer?: any, space?: string | number): string {
    const cache = new WeakSet();
    
    const safeReplacer = (key: string, val: any) => {
      // 1. Handle circular references
      if (typeof val === 'object' && val !== null) {
        if (cache.has(val)) {
          return '[Circular]';
        }
        
        // 2. Prevent stringifying DOM Elements
        if (val instanceof HTMLElement || (val && val.nodeType && val.nodeName)) {
          return `[HTMLElement ${val.tagName || 'Node'}]`;
        }

        // 3. Prevent stringifying React Internals (Fibers, Props)
        if (key.startsWith('__reactFiber') || key.startsWith('__reactProps') || key.startsWith('__reactEvents')) {
          return undefined;
        }

        // 4. Handle React Elements ($$typeof)
        if (val && val.$$typeof) {
          return '[ReactElement]';
        }

        cache.add(val);
      }

      // 5. Chain to the user-provided replacer if it exists
      if (typeof replacer === 'function') {
        return replacer(key, val);
      }
      
      // If replacer is an array of keys
      if (Array.isArray(replacer) && !replacer.includes(key) && key !== "") {
        return undefined;
      }

      return val;
    };

    try {
      return originalStringify(value, safeReplacer, space);
    } catch (err) {
      console.warn('Safe stringify failed, returning fallback string', err);
      return '[Serialization Error]';
    }
  } as any;
})();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);