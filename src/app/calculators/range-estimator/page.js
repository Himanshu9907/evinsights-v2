"use client";

import { useMemo, useState } from "react";

export default function RangeEstimator() {
  const [battery, setBattery] = useState(60);
  const [efficiency, setEfficiency] = useState(16);
  const [highway, setHighway] = useState(50);
  const [weather, setWeather] = useState("normal");
  const [ac, setAc] = useState("normal");

  const result = useMemo(() => {
    const safeBattery = Math.max(0, battery);
    const safeEfficiency = Math.max(0.1, efficiency);

    // Base range from battery and efficiency.
    const baseRange =
      (safeBattery / safeEfficiency) * 100;

    // Highway driving generally consumes more energy.
    const highwayFactor =
      1 - (Math.min(100, Math.max(0, highway)) * 0.12) / 100;

    const weatherFactors = {
      normal: 1,
      hot: 0.94,
      cold: 0.82,
    };

    const acFactors = {
      low: 0.98,
      normal: 0.95,
      high: 0.90,
    };

    const weatherFactor =
      weatherFactors[weather] || 1;

    const acFactor =
      acFactors[ac] || 0.95;

    const estimatedRange =
      baseRange *
      highwayFactor *
      weatherFactor *
      acFactor;

    const rangeLoss =
      baseRange > 0
        ? ((baseRange - estimatedRange) / baseRange) * 100
        : 0;

    return {
      baseRange,
      estimatedRange,
      rangeLoss,
    };
  }, [
    battery,
    efficiency,
    highway,
    weather,
    ac,
  ]);

  return (
    <main className="shell range-estimator-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="range-estimator-hero">

        <div className="range-estimator-hero__content">

          <span className="eyebrow">
            EV ownership tool
          </span>

          <h1>
            What's your EV's
            <span>real-world range?</span>
          </h1>

          <p>
            Estimate practical driving range by accounting
            for battery size, efficiency, highway driving,
            weather and climate-control usage.
          </p>

        </div>

        <div className="range-estimator-hero__visual">

          <div className="range-orb">

            <div className="range-orb__inner">

              <span>RANGE</span>

              <strong>
                {Math.round(result.estimatedRange)}
              </strong>

              <small>km</small>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CALCULATOR
      ================================================= */}

      <section className="range-estimator-calculator">

        <div className="range-estimator-heading">

          <div>

            <span className="eyebrow">
              Range estimator
            </span>

            <h2>
              Build your real-world scenario.
            </h2>

          </div>

          <p>
            Factory range is only a starting point.
            Your driving conditions can change the result.
          </p>

        </div>

        <div className="range-estimator-grid">

          {/* INPUT PANEL */}

          <div className="range-input-panel">

            <div className="range-step">

              <span>01</span>

              <div>
                <strong>Battery capacity</strong>
                <small>Usable battery size.</small>
              </div>

            </div>

            <label className="range-field">

              <span>
                Battery
                <small>kWh</small>
              </span>

              <div>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={battery}
                  onChange={(e) =>
                    setBattery(
                      Number(e.target.value) || 0
                    )
                  }
                />

                <em>kWh</em>

              </div>

            </label>

            <div className="range-divider" />

            <div className="range-step">

              <span>02</span>

              <div>
                <strong>Energy efficiency</strong>
                <small>Average consumption.</small>
              </div>

            </div>

            <label className="range-field">

              <span>
                Efficiency
                <small>kWh / 100 km</small>
              </span>

              <div>

                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={efficiency}
                  onChange={(e) =>
                    setEfficiency(
                      Number(e.target.value) || 0
                    )
                  }
                />

                <em>kWh</em>

              </div>

            </label>

            <div className="range-divider" />

            <div className="range-step">

              <span>03</span>

              <div>
                <strong>Highway driving</strong>
                <small>Approximate share of driving.</small>
              </div>

            </div>

            <label className="range-field">

              <span>
                Highway mix
                <small>of total driving</small>
              </span>

              <div>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={highway}
                  onChange={(e) =>
                    setHighway(
                      Math.min(
                        100,
                        Math.max(
                          0,
                          Number(e.target.value) || 0
                        )
                      )
                    )
                  }
                />

                <em>%</em>

              </div>

            </label>

            <div className="range-divider" />

            <div className="range-step">

              <span>04</span>

              <div>
                <strong>Weather</strong>
                <small>Typical conditions.</small>
              </div>

            </div>

            <div className="range-options">

              <button
                type="button"
                className={
                  weather === "normal"
                    ? "active"
                    : ""
                }
                onClick={() => setWeather("normal")}
              >
                Normal
              </button>

              <button
                type="button"
                className={
                  weather === "hot"
                    ? "active"
                    : ""
                }
                onClick={() => setWeather("hot")}
              >
                Hot
              </button>

              <button
                type="button"
                className={
                  weather === "cold"
                    ? "active"
                    : ""
                }
                onClick={() => setWeather("cold")}
              >
                Cold
              </button>

            </div>

            <div className="range-divider" />

            <div className="range-step">

              <span>05</span>

              <div>
                <strong>Climate control</strong>
                <small>Typical AC/heater usage.</small>
              </div>

            </div>

            <div className="range-options">

              <button
                type="button"
                className={
                  ac === "low"
                    ? "active"
                    : ""
                }
                onClick={() => setAc("low")}
              >
                Low
              </button>

              <button
                type="button"
                className={
                  ac === "normal"
                    ? "active"
                    : ""
                }
                onClick={() => setAc("normal")}
              >
                Normal
              </button>

              <button
                type="button"
                className={
                  ac === "high"
                    ? "active"
                    : ""
                }
                onClick={() => setAc("high")}
              >
                High
              </button>

            </div>

          </div>

          {/* RESULT PANEL */}

          <div className="range-result-panel">

            <div className="range-result-top">

              <span className="eyebrow">
                Estimated result
              </span>

              <span className="range-live">
                ● LIVE
              </span>

            </div>

            <div className="range-main-result">

              <span>
                Estimated real-world range
              </span>

              <strong>
                {Math.round(result.estimatedRange)}
                <small> km</small>
              </strong>

              <p>
                Practical range under the selected
                driving conditions.
              </p>

            </div>

            <div className="range-result-cards">

              <div>

                <span>
                  Base range
                </span>

                <strong>
                  {Math.round(result.baseRange)} km
                </strong>

                <small>
                  Before condition adjustments
                </small>

              </div>

              <div>

                <span>
                  Estimated loss
                </span>

                <strong>
                  {Math.round(result.rangeLoss)}%
                </strong>

                <small>
                  From selected conditions
                </small>

              </div>

              <div>

                <span>
                  Highway mix
                </span>

                <strong>
                  {highway}%
                </strong>

                <small>
                  Of your driving
                </small>

              </div>

            </div>

            <div className="range-meter">

              <div className="range-meter__labels">

                <span>
                  0 km
                </span>

                <strong>
                  Practical estimate
                </strong>

                <span>
                  {Math.round(result.baseRange)} km
                </span>

              </div>

              <div className="range-meter__track">

                <div
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        (result.estimatedRange /
                          Math.max(
                            1,
                            result.baseRange
                          )) *
                          100
                      )
                    )}%`,
                  }}
                />

              </div>

            </div>

            <div className="range-condition-summary">

              <div>
                <span>Weather</span>
                <strong>
                  {weather === "normal"
                    ? "Normal"
                    : weather === "hot"
                      ? "Hot"
                      : "Cold"}
                </strong>
              </div>

              <div>
                <span>Climate</span>
                <strong>
                  {ac === "low"
                    ? "Low"
                    : ac === "normal"
                      ? "Normal"
                      : "High"}
                </strong>
              </div>

              <div>
                <span>Battery</span>
                <strong>
                  {battery} kWh
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          EXPLANATION
      ================================================= */}

      <section className="range-estimator-info">

        <div>

          <span className="eyebrow">
            Why range changes
          </span>

          <h2>
            Your EV range isn't
            <span>one fixed number.</span>
          </h2>

        </div>

        <div className="range-info-grid">

          <article>

            <span>01</span>

            <h3>
              Speed
            </h3>

            <p>
              Higher speeds increase aerodynamic drag
              and can significantly increase energy use.
            </p>

          </article>

          <article>

            <span>02</span>

            <h3>
              Weather
            </h3>

            <p>
              Temperature affects battery performance,
              cabin heating and overall efficiency.
            </p>

          </article>

          <article>

            <span>03</span>

            <h3>
              Climate control
            </h3>

            <p>
              Air conditioning and especially cabin
              heating can reduce the range available.
            </p>

          </article>

          <article>

            <span>04</span>

            <h3>
              Driving style
            </h3>

            <p>
              Smooth acceleration and regenerative
              braking can improve real-world efficiency.
            </p>

          </article>

        </div>

      </section>

      {/* DISCLAIMER */}

      <section className="range-disclaimer">

        <span>ⓘ</span>

        <p>
          This estimator is an educational approximation,
          not a manufacturer-certified range figure. Actual
          range depends on vehicle design, battery condition,
          speed, traffic, temperature, tyres, terrain,
          payload and driving behaviour.
        </p>

      </section>

    </main>
  );
}

