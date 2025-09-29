const BuyButton = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full lg:w-72 py-4 px-8 rounded-xl text-lg font-bold transition-all duration-200
        ${
          disabled
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-accent-400 hover:bg-accent-500 text-gray-900 animate-pulse-slow hover:animate-none shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        }
      `}
    >
      Купить
    </button>
  );
};

export default BuyButton;
