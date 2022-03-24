const request = require("request");
const User = require("../models/user");
const UserService = require("../service/user");
const { keys } = require('../config/keys')
//get all users
const getUsers = async (req, res) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || error });
  }
};

//get user by id
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.getById(id);
    res.status(200).json({ user: user });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || error, condition: error.condition });
  }
};

//get user details by user Id(work and update)
const getUserDetailsById = async (req, res) => {
  const { userId } = req.params;
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
};

// get User Details By UserName
const getUserDetailsByUserName = async (req, res) => {
  const { userName } = req.params;
  try {
    const user = await UserService.getDetailsByUserName(userName);
    return res.json({ user: user });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || error, condition: error.condition });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
      const {userId}=req.params
    const {newUser} = req.body;
    const user = await UserService.updateById(userId,newUser);
    res.json({ user: user });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || error, condition: error.condition });
  }
};

//user add to cart  i think they did not use it
const addCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cart } = req.body;
    const user = await UserService.addCart(userId, cart);

    return res.json({ user: user });
  } catch (err) {
    res
      .status(error.status || 500)
      .json({ message: error.message || error, condition: error.condition });
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

//check
const checkPermission = async (req, res, next) => {
  try {
    const { userName } = req.params;
    const host = req.get("host");
    const isLocal = req.query.isLocal == "true";
    if (isLocal) return next();
    let apiFlag = false;
    let urlRoute;
    let redirectUrl = host + "/admin";
    if (userName == "api") {
      userName = req.originalUrl.split("/")[2];
      apiFlag = true;
    }
    if (!apiFlag) urlRoute = req.originalUrl.split("/")[3];
    if (!userName) {
      return res.status(401).json({
        des: redirectUrl,
        routes: urlRoute,
        apiFlag: apiFlag,
        status: 401,
      });
    } else {
      const jwt =
        (req.cookies && req.cookies.devJwt) ||
        req.headers["authorization"] ||
        null;
      const cookie = request.cookie(`jwt=${jwt}`);
      const options = {
        method: "GET",
        url: `${keys(req.get('host')).API_URL_ACCOUNT}/isPermission/${userName}`,
        // url: `https://dev.accounts.codes/isPermission/${userName}`,
        headers: { Cookie: cookie },
      };
      request(options, (error, response, body) => {
        if (error || (response && response.statusCode != 200)) {
          return res.status(401).json({
            des: redirectUrl,
            routes: urlRoute,
            apiFlag: apiFlag,
            status: 401,
          });
        } else {
          if (body == "true") {
            // return next();
            return res.send();
          }
          return res.status(401).json({
            des: redirectUrl,
            routes: urlRoute,
            apiFlag: apiFlag,
            status: 401,
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const newUser = UserService.createOne(userName);

    return res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || error });
  }
};

//delete user by id
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const res = UserService.deleteById(userId);
    return res.status(200).json({ message: res });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || error, condition: error.condition });
  }
};
module.exports = {
  checkPermission,
  createUser,
  getUser,
  getUsers,
  getUserDetailsByUserName,
  getUserDetailsById,
  updateUser,
  addCart,
  history,
  deleteUser,
};
