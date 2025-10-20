import { HttpResponse } from "../contracts/httpContracts";

export interface IUseCase<T = any, R = any> {
  execute(request: T): Promise<HttpResponse<R>>;
}

export interface IUseCase_<T = any, P = any, R = any> {
  execute(request: T, params: P): Promise<HttpResponse<R>>;
}

export interface IUseCaseFild<F = any, V = any, R = any> {
  execute: (fild: F, value: V) => Promise<HttpResponse<R>>;
}
