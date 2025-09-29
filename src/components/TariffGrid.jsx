import TariffCard from "./TariffCard";

const TariffGrid = ({
  tariffs,
  selectedTariff,
  onTariffSelect,
  isTimerExpired,
}) => {
  // Sorting so best tariff always comes first
  const sortedTariffs = [...tariffs].sort((a, b) => {
    if (a.is_best) return -1;
    if (b.is_best) return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
      {sortedTariffs.map((tariff, index) => (
        <div
          key={`${tariff.period}-${tariff.price}`}
          className={tariff.is_best ? "lg:col-span-3" : ""}
        >
          <TariffCard
            tariff={tariff}
            isSelected={selectedTariff?.period === tariff.period}
            onSelect={() => onTariffSelect(tariff)}
            isTimerExpired={isTimerExpired}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};

export default TariffGrid;
