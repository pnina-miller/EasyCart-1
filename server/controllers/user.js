const request = require('request');
const User = require("../models/user");
//get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//get user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
//checkUser
const checkUser = async (req, res) => {
  const { user, idToken } = req.body;
  verifyAccount(user, idToken)
    .then(function (callback) {
      res.json(callback);
    })
    .catch((error) => {
      res.json(error);
    });
}
// get User Details By UserName
const getUserDetailsByUserName = async (req, res) => {
  const { userName } = req.params
  try {
      const user = await User.findOne({ userName: userName })
      .populate('cart')
      .populate({
      path: "business",
      //check why needed?
      populate: {
        path: "userRecommendation"
      },
      populate: {
        path: "category"
      },
    });

    if (user == null) {
      res.status(400).json({eeror:"This user doesn't exist"});
    } else {
      return res.json({ user: user });
    }
  } catch (error) {
    res.status(400).json({ massage: error.maasage });
  }
}
//get user details by user Id(work and update)
const getUserDetailsById = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findOne({ _id: userId }).populate({
      path: "business",
    });

    if (user == null) {
      res.send("This user doesn't exist");
    } else {
      return res.json({ user: user });
    }
  } catch (error) {
    res.status(400).json({ massage: error.maasage });
  }
}
// update user
const updateUser = async (req, res) => {
  try {
    const {
      googleId,
      userName,
      lastName,
      youTube,
      instagram,
      linkedin,
      description,
      email,
      phone,
      facebook,
      twitter,
      profileImg,
    } = req.body;

    const user = await User.findOneAndUpdate(
      { uid: googleId },
      {
        uid: googleId,
        userName: userName,
        lastName: lastName,
        youTube: youTube,
        instagram: instagram,
        linkedin: linkedin,
        email: email,
        phone: phone,
        facebook: facebook,
        description: description,
        twitter: twitter,
        profileImg: profileImg,
      }
    );

    await user.save();
    const u = await User.findOne({ uid: googleId });
    res.status(200).json({ message: "the user is updata", user: u });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//user add to cart  i think they did not use it 
const addCart = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    await Users.findOneAndUpdate(
      { _id: req.user.id },
      {
        cart: req.body.cart,
      }
    );

    return res.json({ msg: "Added to cart" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const history = async (req, res) => {
  try {
    const history = await Payment.find({ user_id: req.user.id });
    res.json(history);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const checkPermission = async (req, res, next) => {
  try {
    const host = req.get('host');
    const isLocal = (req.query.isLocal == 'true');
    if (isLocal)
      return next();
    ("in checkPermission", req.originalUrl.split("/"));
    let userName = req.params.userName
    let apiFlag = false
    let urlRoute
    let redirectUrl = host + "/admin";
    if (userName == "api") {
      userName = req.originalUrl.split("/")[2];
      apiFlag = true
    }
    if (!apiFlag) 
    urlRoute = req.originalUrl.split("/")[3]
    if (!userName) {
      return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
    }
    else {
      const jwt = req.cookies && req.cookies.devJwt || req.headers['authorization'] || null
      const cookie = request.cookie(`jwt=${jwt}`)
      const options = {
        method: "GET",
        url: `https://dev.accounts.codes/isPermission/${userName}`,
        headers: { Cookie: cookie }
      };
      request(options, (error, response, body) => {
        if (error ||response &&response.statusCode != 200) {
          return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
        }
        else {
          if (body == 'true') {
            return res.send()
          }
          return res.status(401).json({ des: redirectUrl, routes: urlRoute, apiFlag: apiFlag, status: 401 })
        }
      });
    }
  } catch (error) {
    return res.status(500).send(error)
  }
};
const createUser = async (req, res) => {
  try {
    const { jwt } = req.body;
    const { userName } = req.params
    const user = await User.findOne({ userName })
    if (user) {
      User.findOneAndUpdate({ userName }, { jwt })
      return res.json({ user })
    }
    const newUser = new User({ jwt, userName })
    await newUser.save()
    return res.status(201).json({ user: newUser })
  } catch (error) {
    return res.status(500).json({ error })
  }

}
module.exports = {
  checkPermission,
  createUser,
  checkUser,
  getUser,
  getUsers,
  getUserDetailsByUserName,
  getUserDetailsById,
  updateUser,
  addCart,
  history,
};