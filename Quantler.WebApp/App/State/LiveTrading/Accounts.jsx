export default
{
  upgrade: {
    selectedSubscription: -1,
    subscription: {},
    seenDiscountPopup: false
  },
  login: {
    logging: false,
    selects: {
      brokers: [],
      servers: []
    },
    broker: "",
    server: "",
    username: "",
    password: "",
    brokerloginok: undefined,
    brokerlogin: []
  },
  signup: {
    proceedLoading: false,
    form: {
      selects: {
        countries: [],
        titles: ['Mr', 'Mrs']
      },
      title: "",
      firstName: "",
      lastName: "",
      countryOfBirth: "",
      dateOfBirth: {
        day: 0,
        month: 0,
        year: 0,
        stamp: ""
      },
      phoneNumber: "",
      countryOfResidence: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
    },
    agreements: {
      Losses: false,
      Experience: false,
      Suitable: false,
      Agreements: false,
      Warning: false,
    },
  },
  newAccount: {
    sponsored: {
      brokers: []
    }
  },
}
