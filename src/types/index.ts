export interface Meta {
  readonly loading: boolean;
  readonly success: boolean;
  readonly failure: boolean;
  readonly message: string;
}

export type ConnectMeta = {
  getLoading: (action: Function[] | Function, initial?: boolean) => boolean;
  getSuccess: (action: Function[] | Function, initial?: boolean) => boolean;
  getFailure: (action: Function[] | Function, initial?: boolean) => boolean;
  getMeta: (action: Function) => Meta;
  resetMeta: (action?: Function) => void;
}