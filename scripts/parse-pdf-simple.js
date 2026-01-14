const fs = require('fs');
const path = require('path');

// Упрощенный парсер без зависимостей для изображений
async function parsePDF() {
  const pdfPath = path.join(__dirname, '..', 'source', 'Журнал_летний выпуск_2025_.pdf');
  const articlesOutputPath = path.join(__dirname, '..', 'app', 'data', 'articles-generated.ts');
  
  try {
    const pdfParse = require('pdf-parse');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    
    console.log('=== Информация о PDF ===');
    console.log('Количество страниц:', data.numpages);
    
    // Парсим текст
    const text = data.text;
    const lines = text.split('\n').filter(line => line.trim());
    
    // Сохраняем полный текст для ручной обработки
    const fullTextPath = path.join(__dirname, '..', 'source', 'extracted-text.txt');
    fs.writeFileSync(fullTextPath, text, 'utf-8');
    console.log('\n=== Полный текст сохранен в:', fullTextPath, '===');
    console.log('Обработайте текст вручную и обновите app/data/articles.ts');
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('Библиотека pdf-parse не установлена.');
      console.error('Установите: npm install pdf-parse');
    } else {
      console.error('Ошибка при парсинге PDF:', error.message);
    }
  }
}

parsePDF();

