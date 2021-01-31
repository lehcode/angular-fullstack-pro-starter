export interface ErrorResponseInterface {
  success: boolean,
  error: string,
}

export interface SuccessReponseInterface {
  success: boolean,
  message: string,
  data?: string
}
