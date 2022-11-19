import { ExistingClientQuoteRequest } from '@app/src/common/interfaces/existing-client-quote-request.interface';
import { NewClientQuoteRequest } from '@app/src/common/interfaces/new-client-quote-request.interface';

import axios from './axios';

const createQuoteForNewClient = async (
  newCLientQuote: NewClientQuoteRequest
): Promise<any> => {
  try {
    const response = await axios.post(`/api/quote/new`, newCLientQuote, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.result;
  } catch (err: any) {
    return undefined;
  }
};

const createQuoteForExistingCLient = async (
  existingClientQuote: ExistingClientQuoteRequest
): Promise<any> => {
  try {
    const response = await axios.post(
      `/api/quote/existing`,
      existingClientQuote,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.result;
  } catch (err: any) {
    return undefined;
  }
};

const getTotalQuotesCount = async (): Promise<number> => {
  try {
    const response = await axios.get(`/api/quotes/total`);

    return response.data.result[0]?.count;
  } catch (err: any) {
    return 0;
  }
};

export default {
  createQuoteForNewClient,
  createQuoteForExistingCLient,
  getTotalQuotesCount,
};
