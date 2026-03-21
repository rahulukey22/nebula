import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import type { Plugin } from 'vite';

// Plugin: strip @version suffix from import specifiers (e.g. "sonner@2.0.3" → "sonner")
function stripVersionedImports(): Plugin {
  return {
    name: 'strip-versioned-imports',
    async resolveId(id, importer) {
      // Match package names with @version suffix
      // Handles: "sonner@2.0.3", "@radix-ui/react-slot@1.1.2", "cmdk@1.1.1"
      const match = id.match(/^(@[^/@]+\/[^@]+|[^@][^/]*)@[\d.]+(.*)$/);
      if (match) {
        const stripped = match[1] + (match[2] || '');
        const resolved = await this.resolve(stripped, importer, { skipSelf: true });
        return resolved;
      }
    },
  };
}

// Plugin: resolve figma:asset/ imports to placeholder images
function figmaAssetPlugin(): Plugin {
  const PLACEHOLDER = 'https://placehold.co/400x400/e2e8f0/94a3b8?text=img';
  return {
    name: 'figma-asset',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        return '\0figma-asset:' + id;
      }
    },
    load(id) {
      if (id.startsWith('\0figma-asset:')) {
        return `export default ${JSON.stringify(PLACEHOLDER)};`;
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [figmaAssetPlugin(), stripVersionedImports(), tailwindcss(), react(), viteSingleFile()],
  build: {
    cssCodeSplit: false,
  },
});
