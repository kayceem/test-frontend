import { AnyAction, Middleware, MiddlewareAPI, isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
// import { toast } from "react-toastify";

interface PayloadType {
  data?: {
    error?: string;
  };
}

export function isPayloadErrorMessage(payload: unknown): payload is PayloadType {
  const payloadAsPayloadType = payload as PayloadType;
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payloadAsPayloadType &&
    typeof payloadAsPayloadType.data?.error === 'string'
  );
}


export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  /**
  * `` ISREJECTEDWITHVALUE` is a function that helps us to check the Action with RejectedwithValue = True from CreateAsyncthunk
  * RTK Query uses `createAsynchunk` inside so we can use` `isrejaintwithvalue` to check the error 
   */

 // option: in reality is not required to this point!
  if (isRejected(action)) {
    if (action.error.name === 'CustomError') {
      // errors related to the implementation process
      // toast.warn(action.error.message);
    }
  }

  if (isRejectedWithValue(action)) {
    // Whenever doing query or mutation, it will run here
    // errors from the server, then Action it has rejectedwithvalue = true
    // There are actors related to caching that is rejected, then rejectedwithvalue = false, so don't worry, it can't come here
    if (isPayloadErrorMessage(action.payload)) {
      // Error Reject from the server only has a message!
      //ToastWarn(actionPayloadDataError);
    }
  }

  return next(action);
};
