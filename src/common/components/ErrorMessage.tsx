import { Alert } from "@mui/material";

interface ErrorMessageProps {
    errorMessage : string;
}

const ErrorMessage = (errorMessage : ErrorMessageProps) => {
  return (
    <Alert severity="error">
        ${}
    </Alert>
  )
}

export default ErrorMessage