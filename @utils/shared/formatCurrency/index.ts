export const formatCurrency = ({
  amount,
  currency = "USD",
  locale = "en-US",
}: {
  amount: string;
  currency?: string;
  locale?: string;
}): string => {
  if (amount == null) {
    return "-";
  }

  const amountNumber: number = parseFloat(amount);

  return amountNumber.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
};
