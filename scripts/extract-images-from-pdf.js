const fs = require('fs');
const path = require('path');

/**
 * Скрипт для извлечения изображений из PDF
 * Требует: npm install pdf-lib pdfjs-dist canvas
 * Или альтернативно: npm install pdf2pic (для извлечения страниц как изображений)
 */

async function extractImagesWithPdfLib() {
  try {
    const { PDFDocument } = require('pdf-lib');
    const pdfPath = path.join(__dirname, '..', 'source', 'Журнал_летний выпуск_2025_.pdf');
    const outputDir = path.join(__dirname, '..', 'public', 'images');
    
    // Создаем папку для изображений
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    
    console.log(`Найдено страниц: ${pages.length}`);
    
    // Извлекаем изображения из каждой страницы
    let imageCount = 0;
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      // pdf-lib не имеет прямого метода для извлечения изображений
      // Нужен другой подход
    }
    
    console.log(`Извлечено изображений: ${imageCount}`);
    return true;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return false;
    }
    console.error('Ошибка при извлечении изображений с pdf-lib:', error.message);
    return false;
  }
}

async function extractImagesWithPdf2Pic() {
  try {
    const pdf2pic = require('pdf2pic');
    const pdfPath = path.join(__dirname, '..', 'source', 'Журнал_летний выпуск_2025_.pdf');
    const outputDir = path.join(__dirname, '..', 'public', 'images');
    
    // Создаем папку для изображений
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('=== Извлечение страниц PDF как изображений ===');
    
    const convert = pdf2pic.fromPath(pdfPath, {
      density: 200,
      saveFilename: "page",
      savePath: outputDir,
      format: "png",
      width: 1200,
      height: 1600
    });
    
    // Извлекаем первую страницу как обложку
    console.log('Извлечение обложки (страница 1)...');
    const coverResult = await convert(1);
    if (coverResult.path) {
      const coverPath = path.join(outputDir, 'cover.png');
      fs.renameSync(coverResult.path, coverPath);
      console.log(`✓ Обложка сохранена: ${coverPath}`);
    }
    
    // Извлекаем остальные страницы (можно ограничить количество)
    const maxPages = 10; // Ограничиваем для теста
    console.log(`Извлечение страниц 2-${maxPages}...`);
    
    for (let i = 2; i <= maxPages; i++) {
      try {
        const result = await convert(i);
        if (result.path) {
          const pagePath = path.join(outputDir, `page-${i}.png`);
          fs.renameSync(result.path, pagePath);
          console.log(`✓ Страница ${i} сохранена: ${pagePath}`);
        }
      } catch (err) {
        console.log(`⚠ Страница ${i} пропущена: ${err.message}`);
        break; // Если страница не найдена, прекращаем
      }
    }
    
    console.log('\n=== Извлечение завершено ===');
    return true;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return false;
    }
    console.error('Ошибка при извлечении изображений с pdf2pic:', error.message);
    return false;
  }
}

async function extractEmbeddedImagesWithPdfjs() {
  try {
    const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
    const pdfPath = path.join(__dirname, '..', 'source', 'Журнал_летний выпуск_2025_.pdf');
    const outputDir = path.join(__dirname, '..', 'public', 'images');
    
    // Создаем папку для изображений
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('=== Извлечение встроенных изображений из PDF ===');
    
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    
    console.log(`Всего страниц: ${pdf.numPages}`);
    
    let imageCount = 0;
    
    for (let pageNum = 1; pageNum <= Math.min(pdf.numPages, 10); pageNum++) {
      const page = await pdf.getPage(pageNum);
      const ops = await page.getOperatorList();
      
      // Ищем изображения в операторах
      for (let i = 0; i < ops.fnArray.length; i++) {
        if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
          const imageName = ops.argsArray[i][0];
          try {
            const image = await page.objs.get(imageName);
            if (image && image.data) {
              imageCount++;
              const imagePath = path.join(outputDir, `image-${pageNum}-${imageCount}.png`);
              fs.writeFileSync(imagePath, image.data);
              console.log(`✓ Изображение ${imageCount} со страницы ${pageNum} сохранено`);
            }
          } catch (err) {
            // Пропускаем ошибки
          }
        }
      }
    }
    
    console.log(`\n=== Извлечено встроенных изображений: ${imageCount} ===`);
    return true;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return false;
    }
    console.error('Ошибка при извлечении изображений с pdfjs:', error.message);
    return false;
  }
}

async function main() {
  console.log('Попытка извлечения изображений из PDF...\n');
  
  // Метод 1: Извлечение страниц как изображений (рекомендуется для обложки)
  if (await extractImagesWithPdf2Pic()) {
    console.log('\n✓ Успешно использован метод pdf2pic');
    return;
  }
  
  // Метод 2: Извлечение встроенных изображений
  if (await extractEmbeddedImagesWithPdfjs()) {
    console.log('\n✓ Успешно использован метод pdfjs-dist');
    return;
  }
  
  // Если ничего не сработало
  console.log('\n❌ Не найдены библиотеки для извлечения изображений.');
  console.log('\nУстановите одну из библиотек:');
  console.log('  npm install pdf2pic  (рекомендуется для извлечения страниц)');
  console.log('  или');
  console.log('  npm install pdfjs-dist  (для встроенных изображений)');
  console.log('\nПримечание: pdf2pic требует GraphicsMagick или ImageMagick');
  console.log('Установите через:');
  console.log('  Windows: choco install imagemagick');
  console.log('  Mac: brew install imagemagick');
  console.log('  Linux: sudo apt-get install imagemagick');
}

main().catch(console.error);

