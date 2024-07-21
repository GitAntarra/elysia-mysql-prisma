interface SuccessRes<T> {
  msg: string,
  data: T
}
export class SuccessResponse<T> {
  public msg: string;
  public data: T;

  constructor(msg: string, data: T) {
    this.msg = msg;
    this.data = data;
  }
}