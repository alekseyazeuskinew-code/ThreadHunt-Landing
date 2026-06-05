/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статический экспорт: `next build` кладёт готовый сайт в out/ —
  // его можно открыть как файлы или залить на любой хостинг/CDN.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // Этот проект — корень трассировки (рядом есть другие lockfile-ы).
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
