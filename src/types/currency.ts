export interface CurrencyResponseData {
  message: string;
  data: Array<CurrencyData>
}

interface CurrencyData {
  currencyENName: string;
  currencyCNName: string;
  series: Array<CurrencySeries>;
}

interface CurrencySeries {
  timestamp: string;
  price_sell: number | null;
  price_buy: number | null;
}