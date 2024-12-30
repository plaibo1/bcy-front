interface BackendError {
  status: number;
  data: {
    message: string;
    createDate: string;
  };
}

export const isBackendError = (error: unknown): error is BackendError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as BackendError).status === "number" &&
    "data" in error &&
    typeof (error as BackendError).data === "object" &&
    "message" in (error as BackendError).data &&
    typeof (error as BackendError).data.message === "string" &&
    "createDate" in (error as BackendError).data &&
    typeof (error as BackendError).data.createDate === "string"
  );
};
