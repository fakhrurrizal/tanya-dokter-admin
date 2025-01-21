export const endpoints = {
  login: "auth/signin",
  me: "auth/user",
  category_specialst: "category-specialist",
  files: "file",
  data_drugs: "data-drugs",
  user: "user",
} as const;

export type ApiEndpoint = keyof typeof endpoints;

export const getApi: (key: ApiEndpoint) => string = (key) => {
  const host = process.env.NEXT_PUBLIC_API;

  return `${host}/v1/${endpoints[key]}`;
};
