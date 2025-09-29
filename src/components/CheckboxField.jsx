const CheckboxField = ({ checked, onChange, hasError, children }) => {
  return (
    <label className="flex items-start space-x-3 cursor-pointer mb-3 lg:w-2/3">
      <div className="relative flex-shrink-0 mt-0.5 ">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200
            ${
              hasError
                ? "border-red-500 bg-red-500/10"
                : checked
                ? "border-primary-400 bg-primary-400"
                : "border-gray-500 bg-transparent hover:border-gray-400"
            }
          `}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
      </div>
      <span
        className={`text-sm ${hasError ? "text-red-400" : "text-gray-300"}`}
      >
        {children}
      </span>
    </label>
  );
};

export default CheckboxField;
