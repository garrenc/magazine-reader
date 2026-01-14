# Скрипты парсинга PDF

## Простой парсер (рекомендуется для начала)

```bash
pnpm parse-pdf
```

Или напрямую:
```bash
node scripts/parse-pdf-simple.js
```

Этот скрипт:
- Извлекает текст из PDF
- Сохраняет его в `source/extracted-text.txt`
- Требует только `pdf-parse`: `npm install pdf-parse`

## Расширенный парсер (с изображениями)

```bash
pnpm parse-pdf-enhanced
```

Или напрямую:
```bash
node scripts/parse-pdf-enhanced.js
```

Этот скрипт:
- Извлекает текст из PDF
- Извлекает обложку (первая страница) как изображение
- Сохраняет изображения в `public/images/`
- Генерирует `app/data/articles-generated.ts` с данными статей
- Требует: `npm install pdf-parse pdf2pic`

## Извлечение изображений из PDF

```bash
pnpm extract-images
```

Или напрямую:
```bash
node scripts/extract-images-simple.js
```

Этот скрипт:
- Извлекает первую страницу PDF как обложку (`cover.png`)
- Извлекает дополнительные страницы для статей (`hero-1.png`, `hero-2.png` и т.д.)
- Сохраняет все изображения в `public/images/`
- Требует: `npm install pdf2pic` и установленный ImageMagick/GraphicsMagick

## Установка зависимостей

### Для простого парсера:
```bash
npm install pdf-parse
```

### Для расширенного парсера и извлечения изображений:
```bash
npm install pdf2pic
```

### Также требуется ImageMagick или GraphicsMagick:

**Windows:**
```bash
choco install imagemagick
```

**Mac:**
```bash
brew install imagemagick
```

**Linux:**
```bash
sudo apt-get install imagemagick
```

## Использование

1. Поместите PDF файл в папку `source/`
2. Запустите парсер
3. Для простого парсера: обработайте `source/extracted-text.txt` вручную и обновите `app/data/articles.ts`
4. Для расширенного парсера: проверьте сгенерированный `app/data/articles-generated.ts` и при необходимости отредактируйте

## Структура данных

После парсинга обновите:
- `app/data/articles.ts` - список статей
- `app/data/issue-config.ts` - конфигурация выпуска (обложка, название)
- `public/images/` - изображения из PDF

