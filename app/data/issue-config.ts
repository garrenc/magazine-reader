// Конфигурация выпуска журнала
export const issueConfig = {
  coverImage: '/images/cover.png', // Будет заменено после парсинга PDF
  issueNumber: 'Летний выпуск 2025',
  title: 'МедиаБосс',
  appName: 'МедиаБосс',
  appShortName: 'МедиаБосс',
  appDescription: 'Цифровой журнал для чтения'
};

export function getCoverImage(): string {
  return issueConfig.coverImage;
}

export function getIssueTitle(): string {
  return issueConfig.issueNumber;
}

export function getAppName(): string {
  return issueConfig.appName;
}

export function getAppShortName(): string {
  return issueConfig.appShortName;
}

export function getAppDescription(): string {
  return issueConfig.appDescription;
}

