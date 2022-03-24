import { produce } from "immer";
import createReducer from "../ReducerUtils";
const initialState = {
  CheckedBusinessDetails: "",
  flagWhatToShow: 1,
  AllPromotedBusiness: [],
  favoraitsArr: undefined,
  businessNames: {},
  selectedText: "",
  editBusiness: "",
  businessId: "",
  imgIndex: "",
  citiesToAdvertise: [],
  paymentPackageBusiness: "free",
  KeyWords: "",
  arrImg: [],
};
const businessFunctions = {
  setSelectedBusinessDetails(state, action) {
    state.CheckedBusinessDetails = action.payload;
  },
  
  setBusinessRecommendation(state, action) {
    
    if (action.payload?.length > 0 && action.payload !== [])
      state.CheckedBusinessDetails.userRecommendation = state.CheckedBusinessDetails.userRecommendation.concat(action.payload);
  },
  setEditBusinessRecommendation(state, action) {
    if (action.payload?.length > 0 && action.payload !== [])
      state.editBusiness.userRecommendation = state.editBusiness.userRecommendation.concat(action.payload);
  },
  deleteBusinessRecommendation(state, action) {
    let arr =state.editBusiness.userRecommendation
   arr= arr.filter(x => x._id !==action.payload)
    state.editBusiness.userRecommendation =arr

    // arr.forEach((element, i) => {
    //   if (element._id === action.payload) {

    //     arr = arr.splice(i, 1);

    //     state.CheckedBusinessDetails.userRecommendation = arr

    //   }

    // });

  },
  setBusinessByKeyWord(state, action) {
    state.CheckedBusinessDetails = action.payload;
  },
  setUpdateBusinessByKeyWord(state, action) {
    state.editBusiness = action.payload;
  },
  setBusiness(state, action) {
    state.businessId = action.payload;
  },
  setIndexImg(state, action) {
    state.imgIndex = action.payload;
  },
  // createBusinessPerUser(state, action) {
  //     //const business = BusinnesService.createBusinessPerUser(action.payload.newBusiness, action.payload.cities);
  //     //check what the goal of this action
  //     state.
  // },
  setSentMail(state, action) {
    //const contact = BusinnesService.sendMail(action.payload);
    state.CheckedBusinessDetails = action.payload;
  },
  setSentSms(state, action) {
    //const contact = BusinnesService.sendMail(action.payload);
    state.CheckedBusinessDetails = action.payload;
  },
  setPromotedBusinesses(state, action) {
    // const business = await BusinnesService.getPromotedBusiness();
    // let Promotedbusiness = [];
    // if (business) {
    // Object.keys(business).forEach(key => Promotedbusiness.push({ name: key, value: business[key] }))
    state.AllPromotedBusiness = action.payload;
  },
  // setClickofBusiness(state, action) {

  //     let business = { ...state.CheckedBusinessDetails }
  //     business.totalAddedToFavorites = action.payload
  //     state.CheckedBusinessDetails = business
  //     //there is no action for this case
  // },
  setEditBusiness(state, action) {
    state.editBusiness = action.payload;
    //there is no action for this case
  },
  getAllFavoraits(state, action) {
    return action.payload;
    //there is no action for this case
  },
  setDeleteFavoritsByBussinesId(state, action) {
    const business = action.payload;
    state.favoraitsArr = state.favoraitsArr?.filter(
      (f) => f._id !== business._id
    );
    // state.CheckedBusinessDetails = business;
  },
  setAllFavoraits(state, action) {
    
    state.favoraitsArr = action.payload;
  },
  setWhatToShow(state, action) {
    state.flagWhatToShow = action.payload;

  },
  setTotalFavorites(state, action) {
    const totalFavorite = action.payload.totalAddedToFavorites;
    let business = { ...state.CheckedBusinessDetails };
    business.totalAddedToFavorites = totalFavorite;
    state.CheckedBusinessDetails = business;
  },

  // setClickTobusiness(state, action) {
  //     const business = action.payload
  //     // let business = { ...state.CheckedBusinessDetails }
  //     // business.totalClicks = totalClick
  //     state.CheckedBusinessDetails = business
  // },
  setAllNamesOfBusinesses(state, action) {
    state.businessNames = action.payload;
  },
  setSelectedText(state, action) {
    state.selectedText = action.payload;
  },
  editMyBusiness(state, action) {
    state.editBusiness = action.payload;
  },
  setUsersGaleryOfBusiness(state, action) {
    //  const galery = action.payloadBusinnesService.addUsersGaleryOfBusiness(action.payload.usersGalery, action.payload.businessId);
    state.CheckedBusinessDetails = action.payload;
  },
  setCitiesToAdvertise(state, action) {
    state.citiesToAdvertise = action.payload;
  },
  setPaymentPackageOfBusiness(state, action) {
    state.paymentPackageBusiness = action.payload;
  },
  setcheckedKeyWordsOfBusinesses(state, action) {
    state.KeyWords = action.payload;
  },
  setArrImg(state, action) {
    let count = action.payload.length;
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        let x = {
          lastModified: action.payload[i].lastModified,
          name: action.payload[i].name,
          size: action.payload[i].size,
          type: action.payload[i].type,
        };
        state.arrImg.push(x);
      }
    }
  },
};

export default produce(
  (state, action) => createReducer(state, action, businessFunctions),
  initialState
);
