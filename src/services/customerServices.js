import Axios from './Axios';

let customerServices = {
  loginCustomer: async (obj) => {
    const response = await Axios.post(`loginCustomer`, obj)
    return response
  },

  addCustomer: async (obj) => {
    const response = await Axios.post(`addCustomer`, obj)
    return response
  },
}

export default customerServices;