"use client";

import { useMemo, useState } from "react";

export default function RunningCost() {
  const [monthlyKm, setMonthlyKm] = useState(1500);

  const [evEfficiency, setEvEfficiency] = useState(16);
  const [electricityPrice, setElectricityPrice] = useState(8);

  const [petrolMileage, setPetrolMileage] = useState(18);
  const [petrolPrice, setPetrolPrice] = useState(100);

  const result = useMemo(() => {
    const safeKm = Number(monthlyKm) || 0;
    const safeEvEfficiency = Number(evEfficiency) || 0;
    const safeElectricityPrice =
      Number(electricityPrice) || 0;

    const safePetrolMileage =
      Number(petrolMileage) || 0;
    const safePetrolPrice =
      Number(petrolPrice) || 0;

    // EV
    const evKwhMonthly =
      (safeKm / 100) * safeEvEfficiency;

    const evMonthly =
      evKwhMonthly * safeElectricityPrice;

    const evAnnual = evMonthly * 12;

    const evCostPerKm =
      safeKm > 0
        ? evMonthly / safeKm
        : 0;

    // Petrol
    const petrolLitresMonthly =
      safePetrolMileage > 0
        ? safeKm / safePetrolMileage
        : 0;

    const petrolMonthly =
      petrolLitresMonthly * safePetrolPrice;

    const petrolAnnual =
      petrolMonthly * 12;

    const petrolCostPerKm =
      safeKm > 0
        ? petrolMonthly / safeKm
        : 0;

    // Savings
    const monthlySaving =
      petrolMonthly - evMonthly;

    const annualSaving =
      petrolAnnual - evAnnual;

    const savingPercentage =
      petrolMonthly > 0
        ? (monthlySaving / petrolMonthly) * 100
        : 0;

    return {
      evKwhMonthly,
      evMonthly,
      evAnnual,
      evCostPerKm,

      petrolLitresMonthly,
      petrolMonthly,
      petrolAnnual,
      petrolCostPerKm,

      monthlySaving,
      annualSaving,
      savingPercentage,
    };
  }, [
    monthlyKm,
    evEfficiency,
    electricityPrice,
    petrolMileage,
    petrolPrice,
  ]);

  const formatMoney = (value) =>
    `₹${Math.round(value).toLocaleString("en-IN")}`;

  const savingsWidth = Math.min(
    Math.max(result.savingPercentage, 0),
    100
  );

  return (
    <main className="shell running-cost-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="running-cost-hero">

        <div className="running-cost-hero__content">

          <span className="eyebrow">
            EV ownership tool
          </span>

          <h1>
            EV vs petrol.
            <span>See the real running cost.</span>
          </h1>

          <p>
            Compare the monthly and annual cost of driving
            an electric vehicle against a petrol car using
            your own distance, efficiency and energy prices.
          </p>

        </div>

        <div className="running-cost-hero__visual">

          <div className="running-cost-orb">

            <div className="running-cost-orb__inner">

              <span>
                ESTIMATED ANNUAL SAVING
              </span>

              <strong>
                {formatMoney(result.annualSaving)}
              </strong>

              <small>
                with an EV
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          CALCULATOR
      ================================================= */}

      <section className="running-cost-calculator">

        <div className="running-cost-heading">

          <div>

            <span className="eyebrow">
              Running cost calculator
            </span>

            <h2>
              Put your numbers in.
            </h2>

          </div>

          <p>
            Adjust the assumptions below to see how
            electricity and petrol costs affect your
            monthly and yearly driving expenses.
          </p>

        </div>


        <div className="running-cost-grid">

          {/* =============================================
              EV PANEL
          ============================================= */}

          <div className="running-cost-panel running-cost-panel--ev">

            <div className="running-cost-panel__header">

              <div className="running-cost-panel__icon">
                ⚡
              </div>

              <div>

                <span>
                  ELECTRIC VEHICLE
                </span>

                <h3>
                  EV running cost
                </h3>

              </div>

            </div>


            <label className="running-cost-field">

              <span>
                Monthly distance
                <small>km</small>
              </span>

              <div>

                <input
                  type="number"
                  min="0"
                  value={monthlyKm}
                  onChange={(event) =>
                    setMonthlyKm(
                      Number(event.target.value) || 0
                    )
                  }
                />

                <em>KM / MONTH</em>

              </div>

            </label>


            <label className="running-cost-field">

              <span>
                EV efficiency
                <small>kWh / 100 km</small>
              </span>

              <div>

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={evEfficiency}
                  onChange={(event) =>
                    setEvEfficiency(
                      Number(event.target.value) || 0
                    )
                  }
                />

                <em>KWH / 100 KM</em>

              </div>

            </label>


            <label className="running-cost-field">

              <span>
                Electricity price
                <small>₹ / kWh</small>
              </span>

              <div>

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={electricityPrice}
                  onChange={(event) =>
                    setElectricityPrice(
                      Number(event.target.value) || 0
                    )
                  }
                />

                <em>₹ / KWH</em>

              </div>

            </label>


            <div className="running-cost-panel__result">

              <span>
                Estimated monthly cost
              </span>

              <strong>
                {formatMoney(result.evMonthly)}
              </strong>

              <small>
                {formatMoney(result.evCostPerKm)}
                {" "}per km
              </small>

            </div>

          </div>


          {/* =============================================
              PETROL PANEL
          ============================================= */}

          <div className="running-cost-panel running-cost-panel--petrol">

            <div className="running-cost-panel__header">

              <div className="running-cost-panel__icon">
                ⛽
              </div>

              <div>

                <span>
                  PETROL VEHICLE
                </span>

                <h3>
                  Petrol running cost
                </h3>

              </div>

            </div>


            <label className="running-cost-field">

              <span>
                Monthly distance
                <small>km</small>
              </span>

              <div>

                <input
                  type="number"
                  min="0"
                  value={monthlyKm}
                  onChange={(event) =>
                    setMonthlyKm(
                      Number(event.target.value) || 0
                    )
                  }
                />

                <em>KM / MONTH</em>

              </div>

            </label>


            <label className="running-cost-field">

              <span>
                Petrol mileage
                <small>km / litre</small>
              </span>

              <div>

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={petrolMileage}
                  onChange={(event) =>
                    setPetrolMileage(
                      Number(event.target.value) || 0
                    )
                  }
                />

                <em>KM / L</em>

              </div>

            </label>


            <label className="running-cost-field">

              <span>
                Petrol price
                <small>₹ / litre</small>
              </span>

              <div>

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={petrolPrice}
                  onChange={(event) =>
                    setPetrolPrice(
                      Number(event.target.value) || 0
                    )
                  }
                />

                <em>₹ / L</em>

              </div>

            </label>


            <div className="running-cost-panel__result">

              <span>
                Estimated monthly cost
              </span>

              <strong>
                {formatMoney(result.petrolMonthly)}
              </strong>

              <small>
                {formatMoney(result.petrolCostPerKm)}
                {" "}per km
              </small>

            </div>

          </div>

        </div>


        {/* =================================================
            SAVINGS RESULT
        ================================================= */}

        <div className="running-cost-savings">

          <div className="running-cost-savings__header">

            <div>

              <span className="eyebrow">
                THE EV ADVANTAGE
              </span>

              <h2>
                Your potential savings
              </h2>

            </div>

            <strong>
              {result.savingPercentage > 0
                ? `${result.savingPercentage.toFixed(0)}%`
                : "0%"}
            </strong>

          </div>


          <div className="running-cost-savings__numbers">

            <div>

              <span>
                Monthly saving
              </span>

              <strong>
                {formatMoney(
                  Math.max(result.monthlySaving, 0)
                )}
              </strong>

            </div>

            <div>

              <span>
                Annual saving
              </span>

              <strong>
                {formatMoney(
                  Math.max(result.annualSaving, 0)
                )}
              </strong>

            </div>

            <div>

              <span>
                EV annual cost
              </span>

              <strong>
                {formatMoney(result.evAnnual)}
              </strong>

            </div>

            <div>

              <span>
                Petrol annual cost
              </span>

              <strong>
                {formatMoney(result.petrolAnnual)}
              </strong>

            </div>

          </div>


          <div className="running-cost-meter">

            <div className="running-cost-meter__labels">

              <span>
                Petrol
              </span>

              <strong>
                EV saves{" "}
                {result.savingPercentage > 0
                  ? `${result.savingPercentage.toFixed(0)}%`
                  : "0%"}
              </strong>

              <span>
                EV
              </span>

            </div>

            <div className="running-cost-meter__track">

              <div
                style={{
                  width: `${savingsWidth}%`,
                }}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          BREAKDOWN
      ================================================= */}

      <section className="running-cost-breakdown">

        <div className="running-cost-breakdown__intro">

          <span className="eyebrow">
            COST BREAKDOWN
          </span>

          <h2>
            Where your money goes.
          </h2>

          <p>
            These estimates use your selected monthly
            distance and energy assumptions. Actual costs
            can vary with traffic, weather, driving style,
            charging losses and fuel prices.
          </p>

        </div>


        <div className="running-cost-breakdown__cards">

          <article>

            <span>⚡</span>

            <h3>
              EV electricity
            </h3>

            <strong>
              {result.evKwhMonthly.toFixed(1)}
              {" "}kWh
            </strong>

            <p>
              Estimated electricity consumed every month.
            </p>

          </article>


          <article>

            <span>⛽</span>

            <h3>
              Petrol consumed
            </h3>

            <strong>
              {result.petrolLitresMonthly.toFixed(1)}
              {" "}L
            </strong>

            <p>
              Estimated petrol required every month.
            </p>

          </article>


          <article>

            <span>📍</span>

            <h3>
              Monthly distance
            </h3>

            <strong>
              {Number(monthlyKm).toLocaleString("en-IN")}
              {" "}km
            </strong>

            <p>
              Your estimated monthly driving distance.
            </p>

          </article>


          <article>

            <span>💰</span>

            <h3>
              Annual difference
            </h3>

            <strong>
              {formatMoney(
                Math.max(result.annualSaving, 0)
              )}
            </strong>

            <p>
              Potential yearly running-cost advantage.
            </p>

          </article>

        </div>

      </section>


      {/* =================================================
          DISCLAIMER
      ================================================= */}

      <section className="running-cost-disclaimer">

        <span>ⓘ</span>

        <p>
          This calculator provides an estimate for
          comparison purposes only. It does not include
          vehicle purchase price, servicing, insurance,
          depreciation, financing, taxes or charging
          infrastructure costs.
        </p>

      </section>

    </main>
  );
}

