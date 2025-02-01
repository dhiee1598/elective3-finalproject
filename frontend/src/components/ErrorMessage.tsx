import CloseIcon from "@mui/icons-material/Close";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="bg-red-500 text-white w-fit text-center text-sm m-auto p-2 mb-2 rounded-md">
      <p>
        <CloseIcon className="inline-block w-5" /> {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
