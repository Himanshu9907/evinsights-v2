"use client";

import { useCurrency } from "@/context/CurrencyContext";

export default function LocalizedPrice({
  amount,
  currency = "INR",
  fallback = "—",
}) {
  const { formatPrice } = useCurrency();

  if (
    amount === null ||
    amount === undefined ||
    amount === ""
  ) {
    return fallback;
  }

  return formatPrice(
    Number(amount),
    currency
  );
}