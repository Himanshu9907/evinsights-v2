"use client";

import { useMemo, useState } from "react";

export default function ChargingTime() {
  const [battery, setBattery] = useState(60);
  const [currentCharge, setCurrentCharge] = useState(20);
  const [targetCharge, setTargetCharge] = useState(80);
  const [power, setPower] = useState(7.4);

  const result = useMemo(() => {
    const safeBattery = Math.max(0, battery);
    const safeCurrent = Math.min(100, Math.max(0, currentCharge));
    const safeTarget = Math.min(100, Math.max(safeCurrent, targetCharge));
    const safePower = Math.max(0, power);

    const percentageToCharge = safeTarget - safeCurrent;

    const energyNeeded =
      (safeBattery * percentageToCharge) / 100;

    const hours =
      safePower > 0
        ? energyNeeded / safePower
        : 0;

    const totalMinutes = Math.round(hours * 60);

    return {
      energyNeeded,
      hours,
      totalMinutes,
    };
  }, [battery, currentCharge, targetCharge, power]);

  const hours = Math.floor(result.totalMinutes / 60);
  const minutes = result.totalMinutes % 60;

  const formattedTime =
    result.totalMinutes <= 0
      ? "—"
      : `${hours > 0 ? `${hours}h ` : ""}${minutes}m`;

  return (
    <main className="shell charging-time-page">

      {/* HERO */}

      <section className="charging-time-hero">

        <div className="charging-time-hero__content">

          <span className="eyebrow">
            EV ownership tool
          </span>

          <h1>
            How long will your EV
            <span>take to charge?</span>
          </h1>

          <p>
            Estimate charging time from your battery size,
            current charge level and charger power.
          </p>

        </div>

        <div className="charging-time-hero__visual">
          <div className="charging-time-orb">
            <span>⚡</span>
            <strong>EV</strong>
          </div>
        </div>

      </section>

      {/* CALCULATOR */}

      <section className="charging-time-calculator">

        <div className="charging-time-heading">

          <div>
            <span className="eyebrow">
              Charging calculator
            </span>

            <h2>
              Configure your charging session.
            </h2>
          </div>

          <p>
            Adjust the values and see the estimated
            charging time instantly.
          </p>

        </div>

        <div className="charging-time-grid">

          {/* INPUTS */}

          <div className="charging-time-inputs">

            <div className="charging-time-step">
              <span>01</span>

              <div>
                <strong>Battery capacity</strong>
                <small>Your EV battery size.</small>
              </div>
            </div>

            <label className="charging-time-field">

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
                    setBattery(Number(e.target.value) || 0)
                  }
                />

                <em>kWh</em>
              </div>

            </label>

            <div className="charging-time-divider" />

            <div className="charging-time-step">
              <span>02</span>

              <div>
                <strong>Current charge</strong>
                <small>Battery level right now.</small>
              </div>
            </div>

            <label className="charging-time-field">

              <span>
                Current
                <small>%</small>
              </span>

              <div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentCharge}
                  onChange={(e) =>
                    setCurrentCharge(
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

            <div className="charging-time-divider" />

            <div className="charging-time-step">
              <span>03</span>

              <div>
                <strong>Target charge</strong>
                <small>How full you want the battery.</small>
              </div>
            </div>

            <label className="charging-time-field">

              <span>
                Target
                <small>%</small>
              </span>

              <div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={targetCharge}
                  onChange={(e) =>
                    setTargetCharge(
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

            <div className="charging-time-divider" />

            <div className="charging-time-step">
              <span>04</span>

              <div>
                <strong>Charger power</strong>
                <small>Maximum charging power.</small>
              </div>
            </div>

            <label className="charging-time-field">

              <span>
                Charger
                <small>kW</small>
              </span>

              <div>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={power}
                  onChange={(e) =>
                    setPower(Number(e.target.value) || 0)
                  }
                />

                <em>kW</em>
              </div>

            </label>

          </div>

          {/* RESULT */}

          <div className="charging-time-result">

            <div className="charging-time-result__top">

              <span className="eyebrow">
                Estimated result
              </span>

              <span className="charging-time-live">
                ● LIVE
              </span>

            </div>

            <div className="charging-time-main-result">

              <span>
                Estimated charging time
              </span>

              <strong>
                {formattedTime}
              </strong>

              <small>
                From {currentCharge}% to {targetCharge}%
              </small>

            </div>

            <div className="charging-time-result-grid">

              <div>
                <span>Energy needed</span>

                <strong>
                  {result.energyNeeded.toFixed(1)} kWh
                </strong>
              </div>

              <div>
                <span>Charge added</span>

                <strong>
                  {Math.max(
                    0,
                    targetCharge - currentCharge
                  )}%
                </strong>
              </div>

              <div>
                <span>Charger power</span>

                <strong>
                  {power} kW
                </strong>
              </div>

            </div>

            <div className="charging-time-progress">

              <div className="charging-time-progress__labels">
                <span>
                  {currentCharge}%
                </span>

                <span>
                  {targetCharge}%
                </span>
              </div>

              <div className="charging-time-progress__track">

                <div
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, targetCharge)
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CHARGING TYPES */}

      <section className="charging-time-types">

        <div className="charging-time-types__heading">

          <span className="eyebrow">
            Charging basics
          </span>

          <h2>
            The charger matters.
          </h2>

        </div>

        <div className="charging-time-types__grid">

          <article>
            <span>AC</span>

            <h3>
              Home charging
            </h3>

            <p>
              Typically slower but convenient for overnight
              charging at home.
            </p>
          </article>

          <article>
            <span>DC</span>

            <h3>
              Fast charging
            </h3>

            <p>
              Much higher power can add significant range
              during a short stop.
            </p>
          </article>

          <article>
            <span>⚡</span>

            <h3>
              Real-world charging
            </h3>

            <p>
              Actual charging can be slower because of
              battery temperature, state of charge and
              charging curves.
            </p>
          </article>

        </div>

      </section>

      {/* DISCLAIMER */}

      <section className="charging-time-disclaimer">

        <span>ⓘ</span>

        <p>
          This is a simplified estimate based on battery
          capacity and charger power. Real charging time can
          vary because EVs may reduce charging power at
          higher states of charge, and charging losses,
          temperature and vehicle limits can affect the result.
        </p>

      </section>

    </main>
  );
}

