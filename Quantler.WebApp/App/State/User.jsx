export let User =
{
  details: {
    Subscription: {},
    OnBoarded: "",
    AutoDiscoveryOn: false,
    NewsletterOn: false,
    UserID: "",
    Title: "",
    FirstName: "",
    LastName: "",
    CountryOfBirth: "",
    DateOfBirth: "",
    PhoneNumber: "",
    CountryOfResidence: "",
    State: "",
    City: "",
    Street: "",
    ZipCode: "",
    Agreements: "",
    ChargifyID: "",
    ChannelID: ""
  },
  ui: {
    upgradeModalId: null,
  },
  userBar: {
    open: false,
    view: "Default",
    userDetails: {
      statistics: []
    },
    accountDetails: {
      id: -1,
      loading: true,
      data: {
        AvatarURL: "",
        FullName: "",
        UserID: -1
      },
      statistics: []
    }
  },
  subscriptions: {},
  managementURL: ""
}
