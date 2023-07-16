import { CurrencyConverter } from './CurrencyConverter';

const amount = 100;
const fromCurrency = 'USD';
const toCurrency = 'EUR';
const apiKey = 'YOUR_API_KEY';

const converter = new CurrencyConverter(apiKey);
converter.convertCurrency(amount, fromCurrency, toCurrency)
  .then((convertedAmount) => {
    console.log(`${amount} ${fromCurrency} is equivalent to ${convertedAmount} ${toCurrency}`);
  })
  .catch((error) => {
    console.error(error.message);
  });
