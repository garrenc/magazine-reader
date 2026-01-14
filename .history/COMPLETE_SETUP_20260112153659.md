# Полная настройка проекта

## Шаг 1: Извлечение текста из PDF

```bash
pnpm parse-pdf
```

Это создаст файл `source/extracted-text.txt` с текстом из PDF.

## Шаг 2: Обработка текста и создание статей

```bash
pnpm process-pdf
```

Этот скрипт:
- Читает `source/extracted-text.txt`
- Парсит статьи из текста
- Обновляет `app/data/articles.ts`
- Обновляет `app/data/issue-config.ts`

## Шаг 3: Извлечение изображений из PDF

**Установите зависимости:**
```bash
npm install pdf2pic
```

**Установите ImageMagick:**
- Windows: `choco install imagemagick`
- Mac: `brew install imagemagick`
- Linux: `sudo apt-get install imagemagick`

**Запустите извлечение:**
```bash
pnpm extract-images
```

Это создаст:
- `public/images/cover.png` - обложка журнала
- `public/images/hero-1.png`, `hero-2.png` и т.д. - изображения статей

## Шаг 4: Проверка и редактирование

1. Проверьте `app/data/articles.ts` - при необходимости отредактируйте статьи
2. Проверьте пути к изображениям в статьях
3. Убедитесь, что все изображения на месте в `public/images/`

## Шаг 5: Запуск проекта

```bash
pnpm dev
```

Откройте `http://localhost:3000` в браузере.

## Готово!

Теперь у вас есть:
- ✅ Все статьи из PDF
- ✅ Изображения из PDF
- ✅ Обложка журнала
- ✅ Рабочее приложение

## Альтернативный способ (если ImageMagick не установлен)

Если не можете установить ImageMagick, вы можете:
1. Вручную извлечь страницы из PDF как изображения
2. Сохранить их в `public/images/` с именами:
   - `cover.png` - первая страница
   - `hero-1.png`, `hero-2.png` и т.д. - страницы статей
3. Обновить пути в `app/data/articles.ts`

