export interface Data<T = null> {
  ok: boolean;
  data?: T;
  error?: string;
}
