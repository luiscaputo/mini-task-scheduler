export const appSystemTag = "Mini Task Scheduler";
export const appTitle = "Mini Task Scheduler api challenge";
export const appVersion = "0.0.1";
export const appPort = () => process.env.PORT || 3000;

export const appDocPath = `/api/doc`;
export const appDocTitle = `${appTitle}`;
export const appDocDescription = `${appDocTitle} | Documentantion`;

export const appDocUsername = () => process.env.USER_DOCS ?? "doc";
export const appDocPassword = () => process.env.PASS_DOCS ?? "password";
