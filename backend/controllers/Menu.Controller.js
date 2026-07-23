import Menu from "../models/Menu.Model.js";

// Add Menu
export const addMenu = async (req, res) => {
    try {
        const menu = await Menu.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file?.path || req.body.image // handle both file and existing image
        });

        res.status(201).json({
            success: true,
            message: "Menu item added successfully",
            data: menu
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Menus
export const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: menus
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Menu
export const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedMenu = await Menu.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedMenu) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }

        res.status(200).json({
            success: true,
            message: "Menu updated successfully",
            data: updatedMenu
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Menu
export const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMenu = await Menu.findByIdAndDelete(id);

        if (!deletedMenu) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }

        res.status(200).json({
            success: true,
            message: "Menu item deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};