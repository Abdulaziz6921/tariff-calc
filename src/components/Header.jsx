import { useCountdown } from "../hooks/useCountdown";

const Header = () => {
  const { formattedTime, isBlinking } = useCountdown();

  return (
    <header className="sticky top-0 z-50 bg-headerBg py-2 px-sm-4 text-center">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-lg font-medium mb-2">
          Успейте открыть пробную неделю
        </h1>
        <div
          className={`text-2xl font-bold ${
            isBlinking ? "blink-red" : "text-accent-400"
          }`}
        >
          + {formattedTime} +
        </div>
      </div>
    </header>
  );
};

export default Header;
