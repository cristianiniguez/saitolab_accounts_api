export type Account = {
  id?: string;
  title: string;
  date: Date;
  value: number;
  type: 'IN' | 'ON';
};
