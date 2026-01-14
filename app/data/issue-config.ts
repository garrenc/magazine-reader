// Конфигурация выпуска журнала
export const issueConfig = {
  coverImage: '/images/cover.png', // Будет заменено после парсинга PDF
  issueNumber: 'Летний выпуск 2025',
  title: 'МедиаБосс'
};

export function getCoverImage(): string {
  return issueConfig.coverImage;
}

export function getIssueTitle(): string {
  return issueConfig.issueNumber;
}

