export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
];

export const CURRENCIES = [
  ['USD', 'US Dollar', '$'], ['EUR', 'Euro', '€'], ['GBP', 'British Pound', '£'],
  ['INR', 'Indian Rupee', '₹'], ['AED', 'UAE Dirham', 'د.إ'], ['CAD', 'Canadian Dollar', 'CA$'],
  ['AUD', 'Australian Dollar', 'A$'], ['JPY', 'Japanese Yen', '¥'], ['CNY', 'Chinese Yuan', '¥'],
  ['KRW', 'South Korean Won', '₩'], ['CHF', 'Swiss Franc', 'CHF'], ['SEK', 'Swedish Krona', 'kr'],
  ['NOK', 'Norwegian Krone', 'kr'], ['NZD', 'New Zealand Dollar', 'NZ$'], ['SGD', 'Singapore Dollar', 'S$'],
  ['SAR', 'Saudi Riyal', '﷼'], ['ZAR', 'South African Rand', 'R'], ['BRL', 'Brazilian Real', 'R$'],
  ['MXN', 'Mexican Peso', 'MX$'], ['THB', 'Thai Baht', '฿'],
].map(([code, name, symbol]) => ({ code, name, symbol }));

export const MARKETS = [
  ['US','United States','USD','en'], ['CA','Canada','CAD','en'], ['MX','Mexico','MXN','es'],
  ['GB','United Kingdom','GBP','en'], ['DE','Germany','EUR','de'], ['FR','France','EUR','fr'],
  ['IT','Italy','EUR','it'], ['ES','Spain','EUR','es'], ['PT','Portugal','EUR','pt'],
  ['IN','India','INR','hi'], ['AE','United Arab Emirates','AED','ar'], ['SA','Saudi Arabia','SAR','ar'],
  ['JP','Japan','JPY','ja'], ['KR','South Korea','KRW','ko'], ['CN','China','CNY','zh'],
  ['AU','Australia','AUD','en'], ['NZ','New Zealand','NZD','en'], ['SG','Singapore','SGD','en'],
  ['BR','Brazil','BRL','pt'], ['ZA','South Africa','ZAR','en'], ['TH','Thailand','THB','en'],
].map(([code, name, currency, language]) => ({ code, name, currency, language }));

export const DEFAULT_LANGUAGE = 'en';
export const DEFAULT_CURRENCY = 'USD';

export function currencyMeta(code = DEFAULT_CURRENCY) {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
}

export function formatMoney(amount, currency = DEFAULT_CURRENCY, locale = 'en-US') {
  if (amount === null || amount === undefined || amount === '') return 'Price unavailable';
  const value = Number(amount);
  if (!Number.isFinite(value)) return String(amount);
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
  } catch {
    return `${currencyMeta(currency).symbol}${Math.round(value).toLocaleString(locale)}`;
  }
}
