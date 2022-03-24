class Business {
  constructor(values) {
    values?.forEach(([key, value]) => (this[key] = value));
  }
  businessName = "";
  keyWords = "";
  opening_hours = {
    sunday: [{ start: "", end: "" }],
    monday: [{ start: "", end: "" }],
    tuesday: [{ start: "", end: "" }],
    wednesday: [{ start: "", end: "" }],
    thursday: [{ start: "", end: "" }],
    friday: [{ start: "", end: "" }],
    saturday: [{ start: "", end: "" }],
  };
  adress = "";
  phone = "";
  email = "";
  description = "";
  category = [];
  website = "";
  elevator = false;
  FriendlyWorkspace = false;
  smokingAllowed = false;
  events = false;
  facebook = "";
  twitter = "";
  googleplus = "";
  galery = [];
  service = [];
  seoDescription = "";
  seoArrKeyWords = "";
  freeParkingOnPremises = false;
  wirelessInternet = false;
  citiesForAdvertising = [];
  aboutTitle = "";
  servicesTitle = "";
  categoriesTitle = "";
}

export default Business;
