import Menu from "../models/Menu.Model.js";

export const addMenu = async(req,res)=>{

    try{

        const menu = await Menu.create({

            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:req.file.path

        });

        res.status(201).json({
            success:true,
            data:menu
        });

    }

    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}

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