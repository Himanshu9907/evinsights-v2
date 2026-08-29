// "use client";

// import { useEffect, useMemo, useState } from "react";

// /*
//   IMPORTANT

//   Parent vehicle page se:
//   - price
//   - currency
//   - convertedPrice

//   pass kiya jayega.

//   convertedPrice ko tumhare existing Currency Context ke
//   conversion logic se calculate karna hai.

//   Agar tumhara current currency context already amount convert
//   karta hai, wahi value yahan pass karo.
// */

// export default function VehicleEmiCalculator({
//   price,
//   currency = "INR",
//   convertedPrice,
//   currencySymbol = "₹",
// }) {
//   const basePrice = Number(price);

//   const initialPrice =
//     Number.isFinite(Number(convertedPrice))
//       ? Number(convertedPrice)
//       : basePrice;

//   const [vehiclePrice, setVehiclePrice] =
//     useState(initialPrice);

//   const [downPayment, setDownPayment] =
//     useState(0);

//   const [interestRate, setInterestRate] =
//     useState(9);

//   const [tenure, setTenure] =
//     useState(5);

//   /*
//     Currency change hone par vehicle price update
//   */
//   useEffect(() => {
//     const nextPrice =
//       Number(convertedPrice);

//     if (Number.isFinite(nextPrice)) {
//       setVehiclePrice(nextPrice);
//     }
//   }, [convertedPrice]);

//   /*
//     Currency formatter
//   */
//   const formatter = useMemo(() => {
//     try {
//       return new Intl.NumberFormat("en-IN", {
//         style: "currency",
//         currency,
//         maximumFractionDigits: 0,
//       });
//     } catch {
//       return new Intl.NumberFormat("en-IN", {
//         maximumFractionDigits: 0,
//       });
//     }
//   }, [currency]);

//   /*
//     EMI calculation

//     P = Loan Amount
//     R = Monthly Interest Rate
//     N = Number of Months

//     EMI =
//     P × R × (1 + R)^N
//     -------------------
//        (1 + R)^N - 1
//   */
//   const emi = useMemo(() => {
//     const principal =
//       Math.max(
//         0,
//         Number(vehiclePrice) -
//           Number(downPayment)
//       );

//     const annualRate =
//       Number(interestRate);

//     const months =
//       Number(tenure) * 12;

//     if (
//       !Number.isFinite(principal) ||
//       principal <= 0
//     ) {
//       return 0;
//     }

//     if (
//       !Number.isFinite(months) ||
//       months <= 0
//     ) {
//       return 0;
//     }

//     /*
//       0% interest special case
//     */
//     if (
//       !Number.isFinite(annualRate) ||
//       annualRate === 0
//     ) {
//       return principal / months;
//     }

//     const monthlyRate =
//       annualRate / 12 / 100;

//     const factor =
//       Math.pow(
//         1 + monthlyRate,
//         months
//       );

//     const monthlyEmi =
//       (principal *
//         monthlyRate *
//         factor) /
//       (factor - 1);

//     return Number.isFinite(monthlyEmi)
//       ? monthlyEmi
//       : 0;
//   }, [
//     vehiclePrice,
//     downPayment,
//     interestRate,
//     tenure,
//   ]);

//   const loanAmount = Math.max(
//     0,
//     Number(vehiclePrice) -
//       Number(downPayment)
//   );

//   const totalPayment =
//     emi * Number(tenure) * 12;

//   const totalInterest =
//     Math.max(
//       0,
//       totalPayment - loanAmount
//     );

//   /*
//     Prevent down payment from becoming
//     greater than vehicle price.
//   */
//   function handleDownPayment(value) {
//     const numericValue =
//       Number(value);

//     if (
//       !Number.isFinite(numericValue)
//     ) {
//       setDownPayment(0);
//       return;
//     }

//     setDownPayment(
//       Math.min(
//         Math.max(0, numericValue),
//         Number(vehiclePrice)
//       )
//     );
//   }

//   function formatMoney(value) {
//     return formatter.format(
//       Number.isFinite(Number(value))
//         ? Number(value)
//         : 0
//     );
//   }

//   return (
//     <section
//       id="emi-calculator"
//       className="vehicle-emi-section"
//     >
//       <div className="section-heading">
//         <span className="eyebrow">
//           Ownership planning
//         </span>

//         <h2>
//           Estimate your EV loan EMI.
//         </h2>

//         <p>
//           Calculate an indicative monthly
//           payment for the {currency} price
//           of this vehicle.
//         </p>
//       </div>

//       <div className="emi-calculator-card">

//         {/* =========================================
//             INPUTS
//         ========================================= */}

//         <div className="emi-input-grid">

//           {/* VEHICLE PRICE */}

//           <div className="emi-field">
//             <label htmlFor="vehicle-price">
//               Vehicle Price
//             </label>

//             <div className="emi-input-wrapper">
//               <span className="emi-input-symbol">
//                 {currencySymbol}
//               </span>

//               <input
//                 id="vehicle-price"
//                 type="number"
//                 value={
//                   Number.isFinite(
//                     Number(vehiclePrice)
//                   )
//                     ? Math.round(
//                         Number(vehiclePrice)
//                       )
//                     : 0
//                 }
//                 readOnly
//                 aria-label="Vehicle price"
//               />
//             </div>

//             <small>
//               Current vehicle price
//             </small>
//           </div>

//           {/* DOWN PAYMENT */}

//           <div className="emi-field">
//             <label htmlFor="down-payment">
//               Down Payment
//             </label>

//             <div className="emi-input-wrapper">
//               <span className="emi-input-symbol">
//                 {currencySymbol}
//               </span>

//               <input
//                 id="down-payment"
//                 type="number"
//                 value={downPayment}
//                 min="0"
//                 max={vehiclePrice}
//                 step="1000"
//                 onChange={(event) =>
//                   handleDownPayment(
//                     event.target.value
//                   )
//                 }
//               />
//             </div>

//             <small>
//               Amount paid upfront
//             </small>
//           </div>

//           {/* INTEREST */}

//           <div className="emi-field">
//             <label htmlFor="interest-rate">
//               Interest Rate
//             </label>

//             <div className="emi-input-wrapper">
//               <input
//                 id="interest-rate"
//                 type="number"
//                 value={interestRate}
//                 min="0"
//                 max="30"
//                 step="0.1"
//                 onChange={(event) =>
//                   setInterestRate(
//                     Math.max(
//                       0,
//                       Number(
//                         event.target.value
//                       ) || 0
//                     )
//                   )
//                 }
//               />

//               <span className="emi-input-suffix">
//                 %
//               </span>
//             </div>

//             <small>
//               Annual interest rate
//             </small>
//           </div>

//           {/* TENURE */}

//           <div className="emi-field">
//             <label htmlFor="loan-tenure">
//               Loan Tenure
//             </label>

//             <select
//               id="loan-tenure"
//               value={tenure}
//               onChange={(event) =>
//                 setTenure(
//                   Number(
//                     event.target.value
//                   )
//                 )
//               }
//             >
//               <option value="3">
//                 3 Years
//               </option>

//               <option value="4">
//                 4 Years
//               </option>

//               <option value="5">
//                 5 Years
//               </option>

//               <option value="6">
//                 6 Years
//               </option>

//               <option value="7">
//                 7 Years
//               </option>

//               <option value="8">
//                 8 Years
//               </option>

//               <option value="10">
//                 10 Years
//               </option>
//             </select>

//             <small>
//               Repayment period
//             </small>
//           </div>

//         </div>

//         {/* =========================================
//             RESULT
//         ========================================= */}

//         <div className="emi-result-panel">

//           <div className="emi-result-main">

//             <span>
//               Indicative Monthly EMI
//             </span>

//             <strong>
//               {formatMoney(emi)}
//             </strong>

//             <small>
//               per month
//             </small>

//           </div>

//           <div className="emi-result-summary">

//             <div>
//               <span>
//                 Loan Amount
//               </span>

//               <strong>
//                 {formatMoney(
//                   loanAmount
//                 )}
//               </strong>
//             </div>

//             <div>
//               <span>
//                 Total Interest
//               </span>

//               <strong>
//                 {formatMoney(
//                   totalInterest
//                 )}
//               </strong>
//             </div>

//             <div>
//               <span>
//                 Total Payment
//               </span>

//               <strong>
//                 {formatMoney(
//                   totalPayment
//                 )}
//               </strong>
//             </div>

//           </div>

//         </div>

//         {/* =========================================
//             NOTE
//         ========================================= */}

//         <div className="emi-disclaimer">
//           <span>
//             i
//           </span>

//           <p>
//             This is an indicative EMI calculation.
//             Actual EMI may vary depending on the
//             lender, loan amount, interest rate,
//             processing fees, taxes and eligibility.
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";

export default function VehicleEMICalculator({
  vehiclePrice,
  originalCurrency = "INR",
}) {
  const {
    currency,
    currencies,
    convertAmount,
    formatPrice,
  } = useCurrency();

  const [downPayment, setDownPayment] =
    useState(0);

  const [interestRate, setInterestRate] =
    useState(9);

  const [loanYears, setLoanYears] =
    useState(5);

  /*
    Vehicle price is stored in DB
    in its original currency.
  */

  const convertedVehiclePrice =
    useMemo(() => {
      return (
        convertAmount(
          vehiclePrice,
          originalCurrency
        ) || 0
      );
    }, [
      vehiclePrice,
      originalCurrency,
      currency,
      convertAmount,
    ]);

  /*
    Keep down payment inside
    currently selected currency.
  */

  const maxDownPayment =
    convertedVehiclePrice;

  const safeDownPayment =
    Math.min(
      Math.max(
        Number(downPayment) || 0,
        0
      ),
      maxDownPayment
    );

  const loanAmount =
    Math.max(
      convertedVehiclePrice -
        safeDownPayment,
      0
    );

  const monthlyRate =
    Number(interestRate) / 100 / 12;

  const totalMonths =
    Number(loanYears) * 12;

  let monthlyEMI = 0;

  if (
    loanAmount > 0 &&
    totalMonths > 0
  ) {
    if (monthlyRate === 0) {
      monthlyEMI =
        loanAmount /
        totalMonths;
    } else {
      monthlyEMI =
        loanAmount *
        monthlyRate *
        Math.pow(
          1 + monthlyRate,
          totalMonths
        ) /
        (
          Math.pow(
            1 + monthlyRate,
            totalMonths
          ) - 1
        );
    }
  }

  const totalPayment =
    monthlyEMI *
    totalMonths;

  const totalInterest =
    Math.max(
      totalPayment -
        loanAmount,
      0
    );

  const selectedCurrency =
    currencies.find(
      (item) =>
        item.code === currency
    );

  const symbol =
    selectedCurrency?.symbol || "";

  /*
    Format using selected currency.
    Here amount is already in selected
    currency, so original currency is
    selected currency.
  */

  function formatSelected(
    amount
  ) {
    if (
      amount === null ||
      amount === undefined ||
      !Number.isFinite(
        Number(amount)
      )
    ) {
      return "—";
    }

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }
    ).format(Number(amount));
  }

  useEffect(() => {
    setDownPayment(0);
  }, [currency]);

  return (
    <section
      id="emi-calculator"
      className="vehicle-emi-section"
    >
      <div className="section-heading">
        <span className="eyebrow">
          Ownership planning
        </span>

        <h2>
          Estimate your EV loan EMI.
        </h2>

        <p>
          Calculate an indicative monthly
          payment using the vehicle price
          in {currency}.
        </p>
      </div>

      <div className="emi-calculator-card">

        <div className="emi-input-grid">

          {/* VEHICLE PRICE */}

          <div className="emi-field">
            <label htmlFor="vehicle-price">
              Vehicle Price
            </label>

            <div className="emi-input-wrap">
              <span className="emi-symbol">
                {symbol}
              </span>

              <input
                id="vehicle-price"
                type="text"
                value={Math.round(
                  convertedVehiclePrice
                ).toLocaleString(
                  "en-IN"
                )}
                readOnly
              />
            </div>

            <small>
              Current vehicle price
            </small>
          </div>

          {/* DOWN PAYMENT */}

          <div className="emi-field">
            <label htmlFor="down-payment">
              Down Payment
            </label>

            <div className="emi-input-wrap">
              <span className="emi-symbol">
                {symbol}
              </span>

              <input
                id="down-payment"
                type="number"
                value={
                  downPayment
                }
                min="0"
                max={
                  convertedVehiclePrice
                }
                onChange={(event) => {
                  const value =
                    Number(
                      event.target.value
                    );

                  setDownPayment(
                    Math.min(
                      Math.max(
                        value || 0,
                        0
                      ),
                      convertedVehiclePrice
                    )
                  );
                }}
              />
            </div>

            <small>
              Amount paid upfront
            </small>
          </div>

          {/* INTEREST */}

          <div className="emi-field">
            <label htmlFor="interest-rate">
              Interest Rate
            </label>

            <div className="emi-input-wrap">
              <input
                id="interest-rate"
                type="number"
                value={
                  interestRate
                }
                min="0"
                max="50"
                step="0.1"
                onChange={(event) =>
                  setInterestRate(
                    Number(
                      event.target.value
                    ) || 0
                  )
                }
              />

              <span className="emi-suffix">
                %
              </span>
            </div>

            <small>
              Annual interest rate
            </small>
          </div>

          {/* TENURE */}

          <div className="emi-field">
            <label htmlFor="loan-tenure">
              Loan Tenure
            </label>

            <select
              id="loan-tenure"
              value={loanYears}
              onChange={(event) =>
                setLoanYears(
                  Number(
                    event.target.value
                  )
                )
              }
            >
              <option value="3">
                3 Years
              </option>

              <option value="4">
                4 Years
              </option>

              <option value="5">
                5 Years
              </option>

              <option value="6">
                6 Years
              </option>

              <option value="7">
                7 Years
              </option>
            </select>

            <small>
              Repayment period
            </small>
          </div>

        </div>

        {/* RESULT */}

        <div className="emi-result">

          <div className="emi-main-result">
            <span>
              Indicative Monthly EMI
            </span>

            <strong>
              {formatSelected(
                monthlyEMI
              )}
            </strong>

            <small>
              per month
            </small>
          </div>

          <div className="emi-result-stat">
            <span>
              Loan Amount
            </span>

            <strong>
              {formatSelected(
                loanAmount
              )}
            </strong>
          </div>

          <div className="emi-result-stat">
            <span>
              Total Interest
            </span>

            <strong>
              {formatSelected(
                totalInterest
              )}
            </strong>
          </div>

          <div className="emi-result-stat">
            <span>
              Total Payment
            </span>

            <strong>
              {formatSelected(
                totalPayment
              )}
            </strong>
          </div>

        </div>

        <p className="emi-disclaimer">
          This is an indicative calculation.
          Actual EMI may vary depending on
          lender, loan amount, interest rate,
          processing charges and eligibility.
        </p>

      </div>
    </section>
  );
}