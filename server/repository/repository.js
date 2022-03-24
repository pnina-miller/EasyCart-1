const createMany = async (Model, objects) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (objects) {
                objects.forEach(async (obj) => {
                    const newObject = new Model(obj);
                    await newObject.save();
                    resolve();
                });
            }
        } catch (err) {
            reject(err);
        }
    });
};
const createOne = async (Model, object, uniqueQuery) => {
    return new Promise(async (resolve, reject) => {
        try {

            let doc;
            if (uniqueQuery) doc = await Model.findOne(uniqueQuery);
            if (doc)
                throw {
                    doc: doc,
                    message: `${Model.modelName} unique field ${Object.keys(uniqueQuery)[0]
                        } with value:${Object.values(uniqueQuery)[0]}, already exist`,
                    status: 400,
                };
            const newObject = new Model(object);
            await newObject.save();
            //or Modal.insertOne(object)
            resolve(newObject);
        } catch (err) {
            reject(err);
        }
    });
};

const find = async (Model, condition, popArr, selectStr) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = Model.find(condition);
            if (popArr) query = populateDoc(query, popArr);
            if (selectStr) query = selectDoc(query, selectStr);
            const doc = await query;
            if (!doc)
                throw {
                    message: `${Model.modelName} doc not exist`,
                    query: condition,
                    status: 400,
                };
            resolve(doc);
        
        } catch (err) {
            reject(err);
        }
    });
};
const findOne = async (Model, condition, popArr, selectStr) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = Model.findOne(condition);
            if (popArr) query = await populateDoc(query, popArr);
            if (selectStr) query = await selectDoc(query, selectStr);
            const doc = await query;
            if (!doc)
                resolve(null)
            // throw {
            //   message: `${Model.modelName} doc not exist`,
            //   query: condition,
            //   status: 400,
            // };
            resolve(doc);
        } catch (err) {
            reject(err);
        }
    });
};
const findById = async (Model, id, popArr, selectStr) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = Model.findById(id);
            if (popArr) query = populateDoc(query, popArr);
            if (selectStr) query = selectDoc(query, selectStr);
            const doc = await query;
            if (!doc)
                throw {
                    message: `${Model.modelName} doc not exist`,
                    status: 400,
                };
            resolve(doc);
        } catch (err) {
            reject(err);
        }
    });
};
const updateMany = async (Model, condition, update) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await Model.updateMany(condition, update);
            if (doc) resolve(doc);
            else
                throw {
                    message: `${Model.modelName} doc not exist`,
                    query: condition,
                    status: 400,
                };
        } catch (err) {
            reject(err);
        }
    });
};

const findOneAndUpdate = async (
    Model,
    condition,
    update,
    popArr,
    selectStr
) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = Model.findOneAndUpdate(condition, update);
            if (popArr) query = populateDoc(query, popArr);
            if (selectStr) query = selectDoc(query, selectStr);
            const doc = await query;
            if (!doc)
                throw {
                    message: `${Model.modelName} doc not exist`,
                    query: condition,
                    status: 400,
                };
            resolve(await query);
        } catch (err) {
            reject(err);
        }
    });
};
const findByIdAndUpdate = async (Model, id, update) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await Model.findByIdAndUpdate(id, update, { new: true });
            if (doc) {
                resolve(doc);}
            else throw { message: `${Model.modelName} ${id} not exist` };
        } catch (err) {
            reject(err);
        }
    });
};
const findByIdAndRemove = async (Model, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await Model.findByIdAndRemove(id);
            if (res) resolve(res);
            else
                throw {
                    message: `${Model.modelName} doc with id ${id} not exist`,
                    status: 400,
                };
        } catch (err) {
            reject(err);
        }
    });
};

const deleteMany = async (Model, condition) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await Model.deleteMany(condition));
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    findByIdAndUpdate,
    findOneAndUpdate,
    updateMany,
    findById,
    findOne,
    find,
    createOne,
    createMany,
    findByIdAndRemove,
    deleteMany,
};

const selectDoc = (query, selectStr) => {
    return query.select(selectStr);
};
const populateDoc = (query, popArr) => {
    popArr.forEach((pop) => {
        query = query.populate(pop);
    });
    return query;
};