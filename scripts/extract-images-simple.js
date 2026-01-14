const fs = require('fs');
const path = require('path');

/**
 * Простой скрипт для извлечения изображений из PDF
 * Использует pdf2pic - требует установки ImageMagick или GraphicsMagick
 */

async function extractImages() {
  try {
    const pdf2pic = require('pdf2pic');
    const pdfPath = path.join(__dirname, '..', 'source', 'Журнал_летний выпуск_2025_.pdf');
    const outputDir = path.join(__dirname, '..', 'public', 'images');
    
    // Создаем папку для изображений
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('=== Извлечение изображений из PDF ===\n');
    console.log(`PDF файл: ${pdfPath}`);
    console.log(`Папка вывода: ${outputDir}\n`);
    
    const convert = pdf2pic.fromPath(pdfPath, {
      density: 200,           // DPI для качественного изображения
      saveFilename: "temp",    // Временное имя
      savePath: outputDir,
      format: "png",
      width: 1200,             // Ширина в пикселях
      height: 1600             // Высота в пикселях
    });
    
    // Извлекаем первую страницу как обложку
    console.log('📄 Извлечение обложки (страница 1)...');
    try {
      const coverResult = await convert(1, { responseType: "base64" });
      if (coverResult.path) {
        const coverPath = path.join(outputDir, 'cover.png');
        // Если файл уже существует с другим именем, переименовываем
        if (fs.existsSync(coverResult.path)) {
          fs.renameSync(coverResult.path, coverPath);
        }
        console.log(`✓ Обложка сохранена: ${coverPath}`);
      }
    } catch (err) {
      console.error(`✗ Ошибка при извлечении обложки: ${err.message}`);
    }
    
    // Извлекаем дополнительные страницы для статей
    // Можно ограничить количество страниц
    const pagesToExtract = [2, 3, 4, 5]; // Номера страниц для извлечения
    
    for (const pageNum of pagesToExtract) {
      try {
        console.log(`📄 Извлечение страницы ${pageNum}...`);
        const result = await convert(pageNum, { responseType: "base64" });
        if (result.path) {
          const pagePath = path.join(outputDir, `hero-${pageNum - 1}.png`);
          if (fs.existsSync(result.path)) {
            fs.renameSync(result.path, pagePath);
            console.log(`✓ Страница ${pageNum} сохранена: ${pagePath}`);
          }
        }
      } catch (err) {
        console.log(`⚠ Страница ${pageNum} пропущена: ${err.message}`);
        // Прекращаем, если страниц больше нет
        if (err.message.includes('page') || err.message.includes('Page')) {
          break;
        }
      }
    }
    
    console.log('\n=== Извлечение завершено ===');
    console.log(`\nИзображения находятся в: ${outputDir}`);
    console.log('\nСледующие шаги:');
    console.log('1. Проверьте извлеченные изображения');
    console.log('2. Переименуйте их при необходимости');
    console.log('3. Обновите пути в app/data/articles.ts и app/data/issue-config.ts');
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('\n❌ Библиотека pdf2pic не установлена.');
      console.error('\nУстановите зависимости:');
      console.error('  npm install pdf2pic');
      console.error('\nТакже требуется ImageMagick или GraphicsMagick:');
      console.error('  Windows: choco install imagemagick');
      console.error('  Mac: brew install imagemagick');
      console.error('  Linux: sudo apt-get install imagemagick');
    } else {
      console.error('\n❌ Ошибка при извлечении изображений:', error.message);
      if (error.message.includes('ImageMagick') || error.message.includes('GraphicsMagick')) {
        console.error('\n⚠ Убедитесь, что ImageMagick или GraphicsMagick установлены и доступны в PATH');
      }
    }
  }
}

extractImages();

