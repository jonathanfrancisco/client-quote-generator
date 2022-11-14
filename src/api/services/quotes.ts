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

const createQuoteForExistingCLient = async (id: string): Promise<any> => {
  try {
    const response = await axios.post(
      `/api/quote/existing`,
      {},
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

export default {
  createQuoteForNewClient,
  createQuoteForExistingCLient,
};
