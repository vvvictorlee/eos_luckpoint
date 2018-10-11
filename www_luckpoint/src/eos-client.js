import Eos from 'eosjs';

const EOS_CONFIG = {
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
  keyProvider: ['5HyyDh4giSMGF4jcW7VdAAYx75N7KsRTND7CRyU9QHEXPjPRbfF'],
  broadcast: true,
  sign: true
};

export default class EOSClient {
  constructor(contractName, contractSender) {
    this.contractName = contractName;
    this.contractSender = contractSender;

    this.eos = Eos.Localnet(EOS_CONFIG);
  }

  getTableRows = table => {
    return this.eos.getTableRows(true, this.contractName, this.contractSender, table);
  };

  transaction = (action, data) => {
    return this.eos.transaction({
      actions: [
        {
          account: this.contractName,
          name: action,
          authorization: [
            {
              actor: this.contractSender,
              permission: 'active'
            }
          ],
          data: {
            ...data
          }
        }
      ]
    });
  };
}
