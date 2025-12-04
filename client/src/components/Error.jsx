import { Alert } from "antd";
import PropTypes from "prop-types";

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  title = "Error",
  showIcon = true,
  closable = false,
  onRetry = null,
  fullScreen = false,
  className = ""
}) => {
  const containerClass = fullScreen 
    ? "flex items-center justify-center min-h-screen p-4" 
    : "p-4";

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="max-w-2xl w-full">
        <Alert 
          message={title}
          description={message}
          type="error" 
          showIcon={showIcon}
          closable={closable}
          action={
            onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            )
          }
        />
      </div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  showIcon: PropTypes.bool,
  closable: PropTypes.bool,
  onRetry: PropTypes.func,
  fullScreen: PropTypes.bool,
  className: PropTypes.string,
};

export default Error;