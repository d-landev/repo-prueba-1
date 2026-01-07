export const AppErrorCodes = {
  // General Errors (G)
  INTERNAL_ERROR: 'G001',
  VALIDATION_ERROR: 'G002',

  // User/Auth Errors (U)
  USER_NOT_FOUND: 'U001',
  
  // Product/Commerce Errors (P)
  PRODUCT_NOT_FOUND: 'P001',
  PRODUCT_OUT_OF_STOCK: 'P002',
  INSUFFICIENT_STOCK: 'P003',
} as const;

export type AppErrorCode = (typeof AppErrorCodes)[keyof typeof AppErrorCodes];
