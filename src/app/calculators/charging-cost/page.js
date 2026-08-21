// "use client";
// import { useMemo, useState } from "react";
// import { useGlobalPreferences } from "@/lib/i18n/client";
// export default function ChargingCost(){const {money,convert,currency}=useGlobalPreferences();const [km,setKm]=useState(1500);const [eff,setEff]=useState(16);const [rateInInr,setRateInInr]=useState(8);const selectedRate=useMemo(()=>convert(rateInInr,'INR',currency),[rateInInr,currency,convert]);const result=useMemo(()=>({monthly:(km/100)*eff*rateInInr,annual:(km/100)*eff*rateInInr*12,costPerKm:eff*rateInInr/100}),[km,eff,rateInInr]);return <main className="shell"><section className="page-hero"><span className="eyebrow">EV ownership tool</span><h1>Charging cost calculator.</h1><p>Estimate electricity cost from monthly distance, vehicle efficiency and your electricity tariff. This is an estimate, not a utility bill.</p></section><section className="calculator"><div className="calc-grid"><label>Monthly distance (km)<input type="number" value={km} onChange={e=>setKm(Number(e.target.value)||0)}/></label><label>Efficiency (kWh / 100 km)<input type="number" value={eff} onChange={e=>setEff(Number(e.target.value)||0)}/></label><label>Electricity price ({currency} / kWh)<input type="number" value={Number(selectedRate.toFixed(2))} onChange={e=>{const next=Number(e.target.value)||0;setRateInInr(convert(next,currency,'INR'));}}/></label></div><div className="result-box"><span>Estimated monthly charging cost</span><strong>{money(result.monthly,'INR')}</strong><p>Annual: {money(result.annual,'INR')} · Cost per km: {money(result.costPerKm,'INR')}</p></div></section></main>}


"use client";

import { useMemo, useState } from "react";

export default function ChargingCost() {
  const [km, setKm] = useState(1500);
  const [eff, setEff] = useState(16);
  const [rate, setRate] = useState(8);

  const result = useMemo(() => {
    const monthly = (km / 100) * eff * rate;
    const annual = monthly * 12;
    const costPerKm = (eff * rate) / 100;

    return {
      monthly,
      annual,
      costPerKm,
    };
  }, [km, eff, rate]);

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <main className="shell charging-calculator-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="charging-hero">

        <div className="charging-hero__content">

          <span className="eyebrow">
            EV ownership tool
          </span>

          <h1>
            Know what your EV
            <span>really costs to charge.</span>
          </h1>

          <p>
            Estimate your monthly and annual charging cost
            using your driving distance, vehicle efficiency
            and electricity tariff.
          </p>

          <div className="charging-hero__stats">
            <span>MONTHLY ESTIMATE</span>
            <span>ANNUAL COST</span>
            <span>COST PER KM</span>
          </div>

        </div>

        <div className="charging-hero__visual">

          <div className="charging-energy-orb">

            <span>⚡</span>

            <strong>EV</strong>

          </div>

        </div>

      </section>

      {/* =================================================
          CALCULATOR
      ================================================= */}

      <section className="charging-calculator">

        <div className="charging-calculator__head">

          <div>
            <span className="eyebrow">
              Calculator
            </span>

            <h2>
              Your charging economics.
            </h2>
          </div>

          <p>
            Change the values below and the estimate
            updates instantly.
          </p>

        </div>

        <div className="charging-calculator__grid">

          {/* INPUT PANEL */}

          <div className="charging-input-panel">

            <div className="charging-input-panel__header">

              <span>01</span>

              <div>
                <strong>
                  Your driving
                </strong>

                <small>
                  Tell us how much you drive.
                </small>
              </div>

            </div>

            <label className="charging-field">

              <span>
                Monthly distance
                <small>km / month</small>
              </span>

              <div className="charging-input-wrap">

                <input
                  type="number"
                  min="0"
                  value={km}
                  onChange={(e) =>
                    setKm(Number(e.target.value) || 0)
                  }
                />

                <em>KM</em>

              </div>

            </label>

            <div className="charging-divider" />

            <div className="charging-input-panel__header">

              <span>02</span>

              <div>
                <strong>
                  Vehicle efficiency
                </strong>

                <small>
                  Average electricity consumption.
                </small>
              </div>

            </div>

            <label className="charging-field">

              <span>
                Efficiency
                <small>kWh / 100 km</small>
              </span>

              <div className="charging-input-wrap">

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={eff}
                  onChange={(e) =>
                    setEff(Number(e.target.value) || 0)
                  }
                />

                <em>KWH</em>

              </div>

            </label>

            <div className="charging-divider" />

            <div className="charging-input-panel__header">

              <span>03</span>

              <div>
                <strong>
                  Electricity tariff
                </strong>

                <small>
                  Your approximate electricity cost.
                </small>
              </div>

            </div>

            <label className="charging-field">

              <span>
                Electricity price
                <small>₹ / kWh</small>
              </span>

              <div className="charging-input-wrap">

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={rate}
                  onChange={(e) =>
                    setRate(Number(e.target.value) || 0)
                  }
                />

                <em>₹ / KWH</em>

              </div>

            </label>

          </div>

          {/* RESULT PANEL */}

          <div className="charging-result-panel">

            <div className="charging-result-panel__top">

              <span className="eyebrow">
                Live estimate
              </span>

              <span className="charging-live">
                ● Updating
              </span>

            </div>

            <div className="charging-main-result">

              <span>
                Estimated monthly charging cost
              </span>

              <strong>
                {formatMoney(result.monthly)}
              </strong>

              <small>
                Based on {km.toLocaleString("en-IN")} km
                driven each month.
              </small>

            </div>

            <div className="charging-result-grid">

              <div className="charging-result-card">

                <span>
                  Annual
                </span>

                <strong>
                  {formatMoney(result.annual)}
                </strong>

                <small>
                  Estimated yearly cost
                </small>

              </div>

              <div className="charging-result-card">

                <span>
                  Cost / km
                </span>

                <strong>
                  {formatMoney(result.costPerKm)}
                </strong>

                <small>
                  Electricity cost
                </small>

              </div>

              <div className="charging-result-card">

                <span>
                  Energy
                </span>

                <strong>
                  {(
                    (km / 100) *
                    eff
                  ).toFixed(1)} kWh
                </strong>

                <small>
                  Monthly consumption
                </small>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          HOW IT WORKS
      ================================================= */}

      <section className="charging-method">

        <div>

          <span className="eyebrow">
            Methodology
          </span>

          <h2>
            Simple inputs.
            <span>Useful answers.</span>
          </h2>

        </div>

        <div className="charging-method__steps">

          <div>

            <strong>01</strong>

            <h3>
              Distance
            </h3>

            <p>
              Enter how many kilometres you
              typically drive every month.
            </p>

          </div>

          <div>

            <strong>02</strong>

            <h3>
              Efficiency
            </h3>

            <p>
              Add the vehicle's approximate
              electricity consumption.
            </p>

          </div>

          <div>

            <strong>03</strong>

            <h3>
              Electricity price
            </h3>

            <p>
              Enter your approximate electricity
              tariff per kWh.
            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          DISCLAIMER
      ================================================= */}

      <section className="charging-disclaimer">

        <span>ⓘ</span>

        <p>
          This calculator provides an estimate based on
          the values entered. Actual charging costs can
          vary depending on charging losses, charger
          efficiency, electricity tariffs, charging
          location and driving conditions.
        </p>

      </section>

    </main>
  );
}

