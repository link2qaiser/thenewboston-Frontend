import {ReactNode} from 'react';
import {toast} from 'react-toastify';

import Toast from 'components/Toast';
import {ToastType} from 'enums';

export const displayErrorToast = (error: any) => {
  let errorStr: string;

  if (typeof error === 'string') {
    errorStr = error;
  } else if (error?.response?.data) {
    errorStr = JSON.stringify(error.response.data);
  } else if (error?.message) {
    errorStr = error.message;
  } else {
    errorStr = JSON.stringify(error);
  }

  displayToast(errorStr, ToastType.ERROR);
};

/**
 * Displays error toasts for each error message in the provided array.
 * @param {string[]} errors - An array of error messages to be displayed as toasts.
 */
export const displayErrorToasts = (errors: string[]): void => {
  errors.forEach(displayErrorToast);
};

export const displayToast = (message: ReactNode, type: ToastType, className?: string): void => {
  toast(
    <Toast className={className} type={type}>
      {message}
    </Toast>,
  );
};
