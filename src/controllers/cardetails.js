import car_color from "../models/Car_color.js";
import car_detail from "../models/Car_verient.js";
import CarModel from "../models/carmodel.js";
import Model from "../models/carmodel.js";
import CarVariant from "../models/CarVariant.js";
import DealerDetails from "../models/dealer_details.js";

import cloudinary from "../services/Cloudinary.js";



export const CarDetails = async (req, res) => {
    try {
        const { name, model_color, status, model_code } = req.body;
        const existingUser = await Model.findOne({ where: { name } });
        if (existingUser) {
            return res.status(400).json({ message: 'Car model  already exists' });

        }
        const car_image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(car_image);
        const newModel = await Model.create({ name, model_color, model_code, status, image_url: result.secure_url });
        res.status(201).json(newModel);


    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}



export const CarColor = async (req, res) => {
    try {
        const { model_code, color, status } = req.body;

        if (!model_code || !color) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existsColorCode = await ModelColor.findOne({
          where: {
                model_code: model_code,
                color: color
            }
        });

        if(existsColorCode){
            return res.status(400).json({ message: 'Car model color already exists' });
        }


        const car_image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(car_image);

        // Insert into database
        const newColor = await ModelColor.create({
            model_code,
            color,
            image_url: result.secure_url,
            status: status || "pending", // Default status if not provided
        });

        return res.status(201).json({ message: "Car color added successfully", data: newColor });

    } catch (error) {
        console.error("Error adding car color:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const createCarVariant = async (req, res) => {
    try {
        const carData = req.body;

        // Validate required fields
        if (!carData.model_code || !carData.model_name || !carData.variant_name || !carData.fuel_type || !carData.transmission_type || !carData.ex_showroom_price || !carData.on_road_price) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        // Check if model_code exists in models table
        const modelExists = await Model.findOne({ where: { model_code: carData.model_code } });

        if (!modelExists) {
            return res.status(400).json({ message: "Invalid model_code. Model does not exist." });
        }

        // Create new car variant
        const newCarVariant = await CarVariant.create(carData);
        res.status(201).json({ message: "Car variant added successfully", data: newCarVariant });

    } catch (error) {
        console.error("Error adding car variant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getCarmodel = async (req, res) => { 
    try {
       const dealrid =  req.user.dealer_id; 

        const  brand = await DealerDetails.findOne({ where: { dealer_id: dealrid  } })
       
        const modelExists = await Model.findAll({ where: { brand_id: brand?.brand_id } });

        if (!modelExists) {
            return res.status(404).json({ message: "Car model not found" });
        }

        return res.status(200).json(modelExists);
    } catch (error) {
        console.error("Error fetching car model:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getCarColor = async (req, res) => { 
    try {
        const {model_id}= req.body; 
          console.log("model_id", model_id)
        const modelExists = await car_color.findAll({ where: { model_id} });

        if (!modelExists) {
            return res.status(404).json({ message: "Car model not found" });
        }

        return res.status(200).json(modelExists);
    } catch (error) {
        console.error("Error fetching car model:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getVarients = async (req, res) => { 
    try {
        const { model_id, transmission_type } = req.query; // Extract from query parameters
        
        if (!model_id || !transmission_type) {
            return res.status(400).json({ message: "model_id and transmission_type are required" });
        }

        const modelExists = await  car_detail.findAll({ 
            where: { model_id, transmission_type} 
        });
       
        if (modelExists.length === 0) { // Since findAll() returns an array
            return res.status(404).json({ message: "Car model not found" });
        }

        const modelvarient =  modelExists.map(item => item.varient)

        return res.status(200).json(modelvarient);
    } catch (error) {
        console.error("Error fetching car model:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const modelvarientdetails = async (req, res) => { 
    try {
        const {fuel_type, transmission_type, model_id} = req.query; 
       
        

        if (!fuel_type || !transmission_type) {
            return res.status(400).json({ message: "model_id and transmission_type are required" });
        }

        const modelExists = await  car_detail.findAll({ 
            where: {fuel_type, transmission_type, model_id} 
        });
       
        if (modelExists.length === 0) { 
            return res.status(404).json({ message: "Car model not found" });
        }

      

        return res.status(200).json( modelExists );
    } catch (error) {
        console.error("Error fetching car model:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const modelTypes = async (req, res) => { 
    try {
        const {model_id} = req.query; 
       
    
        

 

        const modelExists = await  car_detail.findAll({ 
            where: { model_id} ,
            attributes: ['fuel_type'],
            distinct: true
        });

        const fuelTypes = [...new Set(modelExists.map(car => car.fuel_type))];
       
        if (modelExists.length === 0) { 
            return res.status(404).json({ message: "Car model not found" });
        }

      

        return res.status(200).json(fuelTypes);
    } catch (error) {
        console.error("Error fetching car model:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};




export const modelTypesTransmition = async (req, res) => { 
    try {
        const { model_id, fuel_type } = req.query; 
          console.log("req",  req.query)
        
        // Query to get unique transmission_type for the given model_id and fuel_type
        const modelExists = await car_detail.findAll({ 
            where: { model_id, fuel_type },
            attributes: ['transmission_type'],
            
        });

        // If no models match, return 404
        if (modelExists.length === 0) { 
            return res.status(404).json({ message: "Car model not found" });
        }

        // Extract unique transmission types (no need to use Set here since `distinct: true` was used)
        
        const transmissionTypes= [...new Set(modelExists.map(car => car.transmission_type))];

        return res.status(200).json(transmissionTypes);

    } catch (error) {
        console.error("Error fetching car model:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
