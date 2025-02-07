declare module 'next' {
  export interface RouteHandlerContext {
    params: { [key: string]: string | string[] }
  }
}