import Client from '@app/src/common/interfaces/client.interface';
import axios from './axios';

const getClients = async (): Promise<Client[]> => {
  try {
    const response = await axios.get(`/api/clients`);
    return response.data.result;
  } catch (err: any) {
    return [];
  }
};

export default {
  getClients,
};
