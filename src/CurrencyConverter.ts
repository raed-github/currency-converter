import axios, { AxiosResponse } from 'axios';

interface ExchangeRate {
  rates: Record<string, number>;
}

export class CurrencyConverter {
  private apiUrl: string;

  constructor(apiKey: string) {
    this.apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
  }

  private async getExchangeRate(base: string, target: string): Promise<number> {
    try {
      const response: AxiosResponse<ExchangeRate> = await axios.get(this.apiUrl);
      const rates = response.data.rates;
      const baseRate = rates[base];
      const targetRate = rates[target];
      if (baseRate && targetRate) {
        return targetRate / baseRate;
      } else {
        throw new Error('Invalid currency');
      }
    } catch (error) {
      throw new Error('Failed to retrieve exchange rate data');
    }
  }

  public async convertCurrency(amount: number, from: string, to: string): Promise<number> {
    try {
      const exchangeRate = await this.getExchangeRate(from, to);
      return amount * exchangeRate;
    } catch (error) {
      throw new Error('Failed to convert currency');
    }
  }
}
