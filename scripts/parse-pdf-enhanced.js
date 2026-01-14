const fs = require('fs');
const path = require('path');

async function parsePDF() {
  const pdfPath = path.join(__dirname, '..', 'source', 'Журнал_летний выпуск_2025_.pdf');
  const outputDir = path.join(__dirname, '..', 'public', 'images');
  const articlesOutputPath = path.join(__dirname, '..', 'app', 'data', 'articles-generated.ts');
  
  // Создаем папку для изображений если её нет
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  try {
    const pdfParse = require('pdf-parse');
    const pdf2pic = require('pdf2pic');
    
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    
    console.log('=== Информация о PDF ===');
    console.log('Количество страниц:', data.numpages);
    console.log('Метаданные:', data.info);
    
    // Извлекаем обложку (первая страница)
    console.log('\n=== Извлечение обложки ===');
    try {
      const convert = pdf2pic.fromPath(pdfPath, {
        density: 200,
        saveFilename: "cover",
        savePath: outputDir,
        format: "png",
        width: 1200,
        height: 1600
      });
      
      const coverResult = await convert(1, { responseType: "base64" });
      console.log('Обложка сохранена:', path.join(outputDir, 'cover.1.png'));
    } catch (err) {
      console.warn('Не удалось извлечь обложку:', err.message);
      console.log('Продолжаем без обложки...');
    }
    
    // Парсим текст и структурируем статьи
    console.log('\n=== Парсинг статей ===');
    const text = data.text;
    
    // Простой парсер для извлечения статей (можно улучшить)
    const articles = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    let currentArticle = null;
    let currentContent = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Определяем начало новой статьи (заголовок обычно в верхнем регистре или выделен)
      if (line.length > 20 && line.length < 200 && 
          (line.match(/^[А-ЯЁ]/) || line.includes(':'))) {
        // Сохраняем предыдущую статью
        if (currentArticle && currentContent.length > 0) {
          currentArticle.content = currentContent.join('\n\n');
          articles.push(currentArticle);
        }
        
        // Начинаем новую статью
        currentArticle = {
          slug: line.toLowerCase()
            .replace(/[^а-яёa-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50),
          title: line,
          author: 'Автор',
          content: '',
          heroImage: null
        };
        currentContent = [];
      } else if (currentArticle && line.length > 10) {
        currentContent.push(`<p>${line}</p>`);
      }
    }
    
    // Сохраняем последнюю статью
    if (currentArticle && currentContent.length > 0) {
      currentArticle.content = currentContent.join('\n\n');
      articles.push(currentArticle);
    }
    
    // Генерируем TypeScript файл с данными
    const articlesCode = `// Автоматически сгенерировано из PDF
// Не редактировать вручную - будет перезаписано при следующем парсинге

export interface Article {
  slug: string;
  title: string;
  author: string;
  heroImage?: string;
  content: string;
}

export const articles: Article[] = ${JSON.stringify(articles, null, 2).replace(/"/g, '"')};

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getAllArticles(): Article[] {
  return articles;
}
`;
    
    fs.writeFileSync(articlesOutputPath, articlesCode, 'utf-8');
    console.log('\n=== Статьи сохранены в:', articlesOutputPath, '===');
    console.log('Найдено статей:', articles.length);
    
    // Сохраняем обложку журнала в отдельный файл конфигурации
    const coverConfig = {
      coverImage: '/images/cover.1.png',
      issueNumber: 'Летний выпуск 2025',
      title: 'МедиаБосс'
    };
    
    const coverConfigPath = path.join(__dirname, '..', 'app', 'data', 'issue-config.ts');
    const coverConfigCode = `// Конфигурация выпуска журнала
export const issueConfig = ${JSON.stringify(coverConfig, null, 2)};

export function getCoverImage(): string {
  return issueConfig.coverImage;
}

export function getIssueTitle(): string {
  return issueConfig.issueNumber;
}
`;
    
    fs.writeFileSync(coverConfigPath, coverConfigCode, 'utf-8');
    console.log('Конфигурация выпуска сохранена в:', coverConfigPath);
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('Библиотеки не установлены.');
      console.error('Установите: npm install pdf-parse pdf2pic');
      console.error('\nИли используйте упрощенный парсер без изображений.');
    } else {
      console.error('Ошибка при парсинге PDF:', error.message);
    }
  }
}

parsePDF();

