export type User = {
  name: string;
  email: string;
  password: string;
};

export type Move = {
  title: string;
  accountId: string;
  date: Date;
  value: number;
  type: 'IN' | 'OUT';
};

export type Account = {
  name: string;
};
