import { FetchBaseQueryError } from '@reduxjs/toolkit/query';


interface ErrorFormObject {
  [key: string | number]: string | ErrorFormObject | ErrorFormObject[];
}

interface EntityError {
  status: 422;
  data: {
    error: ErrorFormObject;
  };
}


export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: string }).message === 'string'
  );
}


export function isEntityError(error: unknown): error is EntityError {
  return (
    isFetchBaseQueryError(error) &&
    error.status === 422 &&
    typeof error.data === 'object' &&
    error.data !== null &&
    !(error.data instanceof Array)
  );
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

export interface CategoryError {
  status: number;
  data: {
    message: string;
    errorType: string;
  };
}

export interface UserError {
  status: number;
  data: {
    message: string;
    errorType: string;
  };
}

export interface CourseError {
  status: number;
  data: {
    message: string;
    errorType: string;
  };
}

export interface BlogError {
  status: number;
  data: {
    message: string;
    errorType: string;
  };
}

export interface adminLoginError {
  error: {
    data: {
      message: string;
      errorType: string;
    };
    status: number;
  };
}
export interface BlogsCategoryError {
  status: number;
  data: {
    message: string;
    errorType: string;
  };
}
