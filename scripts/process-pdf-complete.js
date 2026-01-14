const fs = require('fs');
const path = require('path');

/**
 * Комплексный скрипт для обработки PDF:
 * 1. Извлекает текст (если нужно)
 * 2. Парсит статьи из текста
 * 3. Создает структурированные данные
 * 4. Генерирует файлы для приложения
 */

async function processPDF() {
  const textPath = path.join(__dirname, '..', 'source', 'extracted-text.txt');
  const articlesOutputPath = path.join(__dirname, '..', 'app', 'data', 'articles.ts');
  const issueConfigPath = path.join(__dirname, '..', 'app', 'data', 'issue-config.ts');
  
  console.log('=== Обработка PDF данных ===\n');
  
  // Читаем извлеченный текст
  if (!fs.existsSync(textPath)) {
    console.error('❌ Файл extracted-text.txt не найден!');
    console.error('Сначала запустите: pnpm parse-pdf');
    return;
  }
  
  const text = fs.readFileSync(textPath, 'utf-8');
  console.log('✓ Текст загружен из extracted-text.txt\n');
  
  // Парсим статьи
  const articles = parseArticles(text);
  console.log(`✓ Найдено статей: ${articles.length}\n`);
  
  // Генерируем файл со статьями
  const articlesCode = generateArticlesFile(articles);
  fs.writeFileSync(articlesOutputPath, articlesCode, 'utf-8');
  console.log(`✓ Статьи сохранены в: ${articlesOutputPath}`);
  
  // Обновляем конфигурацию выпуска
  const issueConfigCode = generateIssueConfig();
  fs.writeFileSync(issueConfigPath, issueConfigCode, 'utf-8');
  console.log(`✓ Конфигурация выпуска обновлена: ${issueConfigPath}\n`);
  
  console.log('=== Обработка завершена ===');
  console.log('\nСледующие шаги:');
  console.log('1. Извлеките изображения: pnpm extract-images');
  console.log('2. Проверьте и отредактируйте app/data/articles.ts при необходимости');
  console.log('3. Обновите пути к изображениям в статьях');
}

function parseArticles(text) {
  const articles = [];
  const lines = text.split('\n');
  
  // Находим основные статьи по заголовкам
  const articlePatterns = [
    {
      title: 'БЬЮТИ-РИТУАЛЫ ДЛЯ ПОДРОСТКОВ: МИФЫ И РЕАЛЬНОСТЬ',
      author: 'ЮЛИЯ ДОЛГИХ',
      slug: 'beauty-rituals-teens',
      startPage: 5
    },
    {
      title: 'ЭЛЬМИРА АКИНШИНА: ИСКУССТВО ПРЕОБРАЖЕНИЯ ОКОН И ПУТЬ К УСПЕХУ',
      author: 'РЕДАКЦИЯ MEDIABOSS',
      slug: 'elvira-akinshina-windows',
      startPage: 6
    },
    {
      title: 'МОЙ ГЛАВНЫЙ ЭКСПЕРТНЫЙ СОВЕТ: НАЧНИТЕ ТЕСТИРОВАТЬ МЕБЕЛЬ ЧЕРЕЗ СОН',
      author: 'ЕЛЕНА ВИНОГРАДОВА',
      slug: 'elena-vinogradova-furniture',
      startPage: 10
    },
    {
      title: 'ОТ ОФИСНОГО РАБСТВА К ЖУРНАЛУ МЕЧТЫ: КАК ЛЮБОВЬ К ЖИЗНИ, СЫН И НЕМНОГО УПРЯМСТВА ИЗМЕНИЛИ ВСЁ',
      author: 'ЕВГЕНИЯ ЗЕМЦОВА',
      slug: 'evgeniya-zemtsova-dream',
      startPage: 14
    },
    {
      title: 'СТРАТЕГИЯ ЛИЧНОГО БРЕНДА В НОВУЮ ЭРУ ПРОДВИЖЕНИЯ',
      author: 'НАДЕЖДА АХМЕТОВА',
      slug: 'nadezhda-akhmetova-brand',
      startPage: 18
    },
    {
      title: 'ПУТЬ К УСПЕХУ: КАК СЕМЬЯ И ЖЕНСКОЕ СООБЩЕСТВО СТАЛИ МОЕЙ НАДЕЖНОЙ ОПОРОЙ',
      author: 'ЕЛЕНА ПЛЕШКОВА',
      slug: 'elena-pleshkova-success',
      startPage: 20
    }
  ];
  
  for (const pattern of articlePatterns) {
    const content = extractArticleContent(text, pattern);
    if (content) {
      articles.push({
        slug: pattern.slug,
        title: formatTitle(pattern.title),
        author: formatAuthor(pattern.author),
        heroImage: `/images/hero-${articles.length + 1}.png`,
        content: content
      });
    }
  }
  
  return articles;
}

function extractArticleContent(text, pattern) {
  const lines = text.split('\n');
  let inArticle = false;
  let content = [];
  let currentParagraph = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Находим начало статьи
    if (line.includes(pattern.title.split(':')[0]) || 
        (line.includes('--- Страница') && parseInt(line.match(/\d+/)?.[0]) === pattern.startPage)) {
      inArticle = true;
      continue;
    }
    
    // Пропускаем заголовки и метаданные
    if (inArticle) {
      // Останавливаемся на следующей статье или конце страницы с другим номером
      if (line.match(/^--- Страница \d+ ---/) && 
          parseInt(line.match(/\d+/)?.[0]) > pattern.startPage + 3) {
        break;
      }
      
      // Пропускаем служебные строки
      if (line.includes('MEDIABOSS:') || 
          line.includes('Footto:') || 
          line.includes('Make:') ||
          line.includes('Style:') ||
          line.includes('Dress:') ||
          line.includes('Location:') ||
          line.length < 5 ||
          /^[А-ЯЁ]{2,}\s+[А-ЯЁ]{2,}/.test(line)) {
        continue;
      }
      
      // Собираем параграфы
      if (line.length > 20) {
        currentParagraph.push(line);
      } else if (currentParagraph.length > 0) {
        content.push(`<p>${currentParagraph.join(' ')}</p>`);
        currentParagraph = [];
      }
    }
  }
  
  if (currentParagraph.length > 0) {
    content.push(`<p>${currentParagraph.join(' ')}</p>`);
  }
  
  // Добавляем заголовки для структуры
  const formattedContent = addHeadings(content.join('\n\n'));
  
  return formattedContent || null;
}

function addHeadings(content) {
  // Простая логика для добавления заголовков
  // Можно улучшить на основе паттернов в тексте
  return content
    .replace(/<p>([А-ЯЁ][^<]{30,})<\/p>/g, (match, text) => {
      if (text.length < 100 && !text.includes('.')) {
        return `<h2>${text}</h2>`;
      }
      return match;
    });
}

function formatTitle(title) {
  return title
    .split(':')
    .map(part => part.trim())
    .join(': ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatAuthor(author) {
  return author
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function generateArticlesFile(articles) {
  return `export interface Article {
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
}

function generateIssueConfig() {
  return `// Конфигурация выпуска журнала
export const issueConfig = {
  coverImage: '/images/cover.png',
  issueNumber: 'Летний выпуск 2025',
  title: 'МедиаБосс'
};

export function getCoverImage(): string {
  return issueConfig.coverImage;
}

export function getIssueTitle(): string {
  return issueConfig.issueNumber;
}
`;
}

// Запускаем обработку
processPDF().catch(console.error);

