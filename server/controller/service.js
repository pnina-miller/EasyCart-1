const service = require("../service/service")

//// add user recommendation per business
const addService = async (req, res) => {
    try {
        ("enterrrrrr", req.body);
        const { businessId, serviceName } = req.body;
        const newService = await service.addService(businessId, serviceName)
        res.status(200).json({
            message: "created service successfully", newService
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const getServicePerBusiness = async (req, res) => {
    try {
        const {businessId} = req.body;
        ("enter hereeeeee",businessId);
        const data = await service.getServicePerBusiness(businessId)
        ("dar",data);
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
        console.error("error in getting services", err.message);
    }
}
const getAllServices = async (req, res) => {
    try {
        ("enter hereeeeee all");
        const data = await service.getAllServices()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
        console.error("error in getting all services", err.message);
    }
}
module.exports = {
    addService,getServicePerBusiness,getAllServices
}