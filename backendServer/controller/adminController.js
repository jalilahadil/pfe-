const {Administrator}=require("../schemas/adminSchema");
// 🔍 Search: Retrieves an administrator by their unique ID
const getAdministratorById = async (req, res) => {
    try {
        const administrator = await Administrator.findById(req.params.id).populate('user');

        if (!administrator) {
            return res.status(404).json({ error: "Administrator not found" });
        }

        res.status(200).json(administrator);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves an administrator by the associated user's unique ID
const getAdministratorByUserId = async (req, res) => {
    try {
        const administrator = await Administrator.findOne({ user: req.params.userId }).populate('user');

        if (!administrator) {
            return res.status(404).json({ error: "Administrator not found" });
        }

        res.status(200).json(administrator);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 📜 Fetch: Retrieves all administrators from the database
const getAllAdministrators = async (req, res) => {
    try {
        const administrators = await Administrator.find().populate('user');
        res.status(200).json(administrators);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ➕ Add: Creates a new administrator profile and saves it to the database
const createAdministrator = async (req, res) => {
    try {
        const { user } = req.body;

        const newAdministrator = new Administrator({
            user
        
            
        });

        await newAdministrator.save();

        res.status(201).json({ message: "Administrator created successfully", administrator: newAdministrator });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔄 Update: Updates an existing administrator's department or access level
const updateAdministrator = async (req, res) => {
    try {
        const updatedAdministrator = await Administrator.findByIdAndUpdate(
            req.params.id,
           
        );

        if (!updatedAdministrator) {
            return res.status(404).json({ error: "Administrator not found" });
        }

        res.status(200).json(updatedAdministrator);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ❌ Delete: Deletes an administrator by their unique ID
const deleteAdministrator = async (req, res) => {
    try {
        const administrator = await Administrator.findByIdAndDelete(req.params.id);

        if (!administrator) {
            return res.status(404).json({ error: "Administrator not found" });
        }

        res.status(200).json({ message: "Administrator deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports={
    getAdministratorById,
    getAdministratorByUserId,
    getAllAdministrators,
    createAdministrator,
    updateAdministrator,
    deleteAdministrator
}