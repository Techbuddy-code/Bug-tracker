import User from "../models/user.js";
import generationToken from "../Util/token.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const user = await User.create({ name, email, password });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: generationToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter email and password",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
    
        return res.status(200).json({
            success: true,
            token: generationToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } 
     catch (error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
};
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
};