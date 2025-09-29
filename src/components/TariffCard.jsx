import { useState, useEffect } from "react";

const TariffCard = ({
  tariff,
  isSelected,
  onSelect,
  isTimerExpired,
  index,
}) => {
  const [showDiscount, setShowDiscount] = useState(!isTimerExpired);

  // === Handling timer expiration & hide discount with delay ===
  useEffect(() => {
    if (isTimerExpired && showDiscount) {
      setTimeout(() => {
        setShowDiscount(false);
      }, index * 200); // staggered fade-out
    }
  }, [isTimerExpired, index, showDiscount]);

  // === Discount calculation ===
  const discountPercent = Math.round(
    ((tariff.full_price - tariff.price) / tariff.full_price) * 100
  );

  // === Base classes for all cards ===
  const baseClasses = `
    relative cursor-pointer transition-all duration-300 rounded-3xl border-2
    ${
      isSelected
        ? "border-accent-400 bg-gray-700 shadow-lg shadow-accent-400/20"
        : "border-gray-600 bg-gray-800 hover:border-gray-500"
    }
  `;

  // === Special Layout for ХИТ (best tariff) ===
  if (tariff.is_best) {
    return (
      <div
        className={`${baseClasses} w-full px-3 md:px-10 py-5 flex items-center justify-between gap-5`}
        onClick={onSelect}
      >
        {/* Discount Badge */}
        {showDiscount && (
          <div className="absolute top-0 right-20 lg:right-auto lg:left-10 bg-red-500 text-white text-sm md:text-lg px-2 py-1 rounded-b-md">
            -{discountPercent}%
          </div>
        )}

        {/* ХИТ Badge */}
        <div className="absolute top-0 right-0 text-accent-400 sm:text-lg text-sm px-3 py-1 rounded-full">
          ХИТ!
        </div>

        {/* LeftSide */}
        <div className="flex flex-col items-center text-right w-1/2">
          <h3 className="text-xl sm:text-2xl text-white mb-2 font-normal">
            {tariff.period}
          </h3>

          {showDiscount ? (
            <div>
              <div className="text-3xl sm:text-5xl font-bold text-accent-400">
                {tariff.price} ₽
              </div>
              <div className="text-lg text-gray-400 line-through">
                {tariff.full_price} ₽
              </div>
            </div>
          ) : (
            <div className="text-2xl sm:text-5xl font-bold text-white">
              {tariff.full_price} ₽
            </div>
          )}
        </div>

        {/* RightSide*/}
        <div className="w-2/3 text-gray-300 text-sm leading-relaxed">
          {tariff.text}
        </div>
      </div>
    );
  }

  // === Default Layout (all other tariffs) ===
  return (
    <div
      className={`${baseClasses} lg:px-6 lg:pt-12 px-3 py-5 h-full flex flex-col justify-between`}
      onClick={onSelect}
    >
      {/* Discount Badge */}
      {showDiscount && (
        <div className="absolute top-0 right-20 lg:right-auto lg:left-10 bg-red-500 text-white text-sm md:text-lg px-2 py-1 rounded-b-md">
          -{discountPercent}%
        </div>
      )}

      {/* Main Content */}
      <div className="flex lg:flex-col flex-row flex-grow gap-5 w-full">
        {/* Left: Period + Price */}
        <div className="w-1/2 lg:w-full flex flex-col items-center text-right">
          <h3 className="text-xl sm:text-2xl text-white mb-3 font-normal">
            {tariff.period}
          </h3>

          <div className="mb-4">
            {showDiscount ? (
              <div>
                <div className="text-3xl sm:text-5xl font-bold">
                  {tariff.price} ₽
                </div>
                <div className="text-lg text-gray-400 line-through">
                  {tariff.full_price} ₽
                </div>
              </div>
            ) : (
              <div className="text-3xl sm:text-5xl font-bold text-white">
                {tariff.full_price} ₽
              </div>
            )}
          </div>
        </div>

        {/* Right: Description */}
        <div className="w-2/3 lg:w-full flex items-center">
          <p className="text-sm leading-relaxed text-start">{tariff.text}</p>
        </div>
      </div>
    </div>
  );
};

export default TariffCard;
