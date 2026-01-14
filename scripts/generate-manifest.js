const fs = require('fs');
const path = require('path');

// Импортируем конфигурацию (в реальности это будет статический JSON)
const issueConfig = {
  appName: 'МедиаБосс',
  appShortName: 'МедиаБосс',
  appDescription: 'Цифровой журнал для чтения'
};

const manifest = {
  name: issueConfig.appName,
  short_name: issueConfig.appShortName,
  description: issueConfig.appDescription,
  lang: "ru",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#ffffff",
  orientation: "portrait",
  icons: [
    {
      src: "/icons/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable"
    },
    {
      src: "/icons/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
console.log('✓ manifest.json обновлен');

