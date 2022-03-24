const mongoose = require("mongoose");

const businessSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },

  businessName: {
    type: String,
    // required: true,
    // minLength:4
  },
  linkToVideo: [{ type: String }],
  usersVideolink: [{ type: String }],
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
  description: {
    type: String,
    // minlength: 70,
    maxlength: 1000,
  },
  email: {
    type: String,
    match:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  phone: {
    type: String,
    // match: /\d{10}/,
  },
  opening_hours: {
    sunday: [{
      start: { type: String },
      end: { type: String },
    }],
    monday:[{
      start: { type: String },
      end: { type: String },
    }],
    tuesday: [{
      start: { type: String },
      end: { type: String },
    }],
    wednesday: [{
      start: { type: String },
      end: { type: String },
    }],
    thursday: [{
      start: { type: String },
      end: { type: String },
    }],
    friday: [{
      start: { type: String },
      end: { type: String },
    }],
    saturday: [{
      start: { type: String },
      end: { type: String },
    }],
  },
  adress: {
    state: { type: String },
    city: { type: String },
    street: { type: String },
    zipCode: { type: String },
  },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  rating: {
    type: Number,
    default: 0,
  },
  // reviews: {
  //   type: Number,
  //   default: 0,
  // },
  // joinDate: {
  //   type: Date
  // },
  citiesForAdvertising: [{ type: String }],
  elevator: { type: Boolean },
  FriendlyWorkspace: { type: Boolean },
  InstantBook: { type: Boolean },
  WirelessInternet: { type: Boolean },
  freeParkingOnPremises: { type: Boolean },
  freeParkingOnStreet: { type: Boolean },
  smokingAllowed: { type: Boolean },
  events: { type: Boolean },
  website: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  googleplus: { type: String },
  check: { type: Boolean, default:false },
  keyWords: { type: String },
  galery: [{ type: String }],
  userGalery:[{type:String}],
  // userGalery: {
  //   photos: [
  //     {
  //       img: { type: String },
  //       check: { type: Boolean },
  //       userName: { type: String }, //לא כדאי לעשות אותו ID? זה ממילא משתמש קיים
  //     },
  //   ],
  // },
  placeId: { type: String },
  dateAdded: { type: Date },
  type: {
    type: String,
  },

  paidUp: {
    type: String,
    default: "free",
  },
  citiesForAdvertising: [{ type: String }],
  seoArrKeyWords: [{ type: String }],

  seoDescription: {
    type: String},
    
  totalClicks: {
    type: Number,
    default: 0,
  },
  totalAddedToFavorites: {
    type: Number,
    default: 0,
  },
  // totalFavorite: {
  //   type: Number,
  //   default: 0,
  // },
  promotedbusiness: {
    type: Boolean,
  },
  profilePicture: {
    type: String,
  },
  aboutTitle: {
    type: String,
  }, 
  servicesTitle: {
    type: String,
  },
  categoriesTitle: {
    type: String,
  },
  commentsTitle:{ type: String,},
  userRecommendation: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Recommendation" },
  ],
  history: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessHistory" },
  service:[{type: mongoose.Schema.Types.ObjectId, ref: "Service"}]
});

module.exports = mongoose.model("Business", businessSchema);
