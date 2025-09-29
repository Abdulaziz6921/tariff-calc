import { useState, useEffect } from "react";
import Header from "./components/Header";
import TariffGrid from "./components/TariffGrid";
import CheckboxField from "./components/CheckboxField";
import BuyButton from "./components/BuyButton";
import { fetchTariffs } from "./utils/api";
import { useCountdown } from "./hooks/useCountdown";
import modelImg from "./assets/imgs/model.png";

function App() {
  const [tariffs, setTariffs] = useState([]);
  const [selectedTariff, setSelectedTariff] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [hasCheckboxError, setHasCheckboxError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isExpired: isTimerExpired } = useCountdown();

  useEffect(() => {
    const loadTariffs = async () => {
      try {
        const data = await fetchTariffs();
        setTariffs(data);
        // Auto-selecting the best tariff
        const bestTariff = data.find((tariff) => tariff.is_best);
        if (bestTariff) {
          setSelectedTariff(bestTariff);
        }
      } catch (error) {
        console.error("Failed to load tariffs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTariffs();
  }, []);

  const handleTariffSelect = (tariff) => {
    setSelectedTariff(tariff);
    setHasCheckboxError(false);
  };

  const handleBuyClick = () => {
    if (!isAgreed) {
      setHasCheckboxError(true);
      return;
    }

    if (!selectedTariff) {
      return;
    }

    // Handling purchase logic here
    alert(
      `Покупка тарифа "${selectedTariff.period}" на сумму ${
        isTimerExpired ? selectedTariff.full_price : selectedTariff.price
      } ₽`
    );
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
    if (e.target.checked) {
      setHasCheckboxError(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Main Title */}
        <div className="mb-12 lg:ps-14">
          <h2 className="text-xl md:text-4xl font-bold text-white mb-4">
            Выбери подходящий для себя{" "}
            <span className="text-accent-400">тариф</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 items-start">
          {/* Model Image */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <img
                src={modelImg}
                alt="Fitness Model"
                className="w-32 sm:w-40 md:w-56 lg:w-full h-auto mx-auto"
              />
            </div>
          </div>

          {/* Tariffs and Purchase Section */}
          <div className="lg:col-span-8">
            <TariffGrid
              tariffs={tariffs}
              selectedTariff={selectedTariff}
              onTariffSelect={handleTariffSelect}
              isTimerExpired={isTimerExpired}
            />

            {/* Additional Info */}
            <div className="bg-gray-800 rounded-2xl p-4 mb-6 lg:w-2/3">
              <div
                className="flex items-start space-x-4 justify-start
              "
              >
                <div className="flex justify-start text-accent-400  flex-shrink-0 font-semibold">
                  !
                </div>
                <p className="text-gray-300 text-sm">
                  Следуя плану на 3 месяца и более, люди получают в 2 раза
                  лучший результат, чем за 1 месяц
                </p>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <CheckboxField
              checked={isAgreed}
              onChange={handleCheckboxChange}
              hasError={hasCheckboxError}
            >
              Я согласен с{" "}
              <a
                href="#"
                className="text-accent-400 underline hover:text-accent-300 "
              >
                офертой рекуррентных платежей
              </a>{" "}
              и{" "}
              <a
                href="#"
                className="text-accent-400 underline hover:text-accent-300"
              >
                Политикой конфиденциальности
              </a>
            </CheckboxField>

            {/* Buy Button */}
            <BuyButton onClick={handleBuyClick} disabled={!selectedTariff} />

            {/* Disclaimer */}
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              Нажимая кнопку «Купить», Пользователь соглашается на разовое
              списание денежных средств для получения пожизненного доступа к
              приложению. Пользователь соглашается, что данные
              кредитной/дебетовой карты будут сохранены для осуществления
              покупок дополнительных услуг сервиса в случае желания
              пользователя.
            </p>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="mt-16 max-w-3xl mx-auto ">
          <div className="flex flex-col  items-start rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-green-800/20 to-primary-800/20 text-primary-300 border border-primary-300 px-4 py-1 rounded-full text-lg">
                гарантия возврата 30 дней
              </div>
            </div>
            <p className="text-gray-300 text-start leading-relaxed">
              Мы уверены, что наш план сработает для тебя и ты увидишь видимые
              результаты уже через 4 недели! Мы даже готовы полностью вернуть
              твои деньги в течение 30 дней с момента покупки, если ты не
              получишь видимых результатов.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
