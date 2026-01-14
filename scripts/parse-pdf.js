const fs = require('fs');
const path = require('path');

// Попробуем использовать pdf-parse, если установлен
async function parsePDF() {
  const pdfPath = path.join(__dirname, '..', 'source', 'Журнал_летний выпуск_2025_.pdf');
  
  try {
    // Проверяем, установлена ли библиотека
    const pdfParse = require('pdf-parse');
    const dataBuffer = fs.readFileSync(pdfPath);
    
    const data = await pdfParse(dataBuffer);
    
    console.log('=== Информация о PDF ===');
    console.log('Количество страниц:', data.numpages);
    console.log('Метаданные:', data.info);
    console.log('\n=== Текст (первые 5000 символов) ===');
    console.log(data.text.substring(0, 5000));
    
    // Сохраняем полный текст в файл
    const outputPath = path.join(__dirname, '..', 'source', 'extracted-text.txt');
    fs.writeFileSync(outputPath, data.text, 'utf-8');
    console.log('\n=== Полный текст сохранен в:', outputPath, '===');
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('Библиотека pdf-parse не установлена.');
      console.error('Пожалуйста, выполните: npm install pdf-parse');
      console.error('\nИли используйте альтернативный метод для чтения PDF.');
    } else {
      console.error('Ошибка при парсинге PDF:', error.message);
    }
  }
}

parsePDF();



