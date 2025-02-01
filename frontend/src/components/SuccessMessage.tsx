import CheckIcon from "@mui/icons-material/Check";

const SuccessMessage = ({ message }: { message: string }) => {
  return (
    <div className="bg-green-500 text-white w-fit text-center text-sm m-auto p-2 mb-2 rounded-md">
      <p>
        <CheckIcon className="inline-block w-5" /> {message}
      </p>
    </div>
  );
};

export default SuccessMessage;
