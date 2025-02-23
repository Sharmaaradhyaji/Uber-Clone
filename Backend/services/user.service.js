import { userModel } from "../models/user.model.js";

const createUser = async ({ firstname, lastname, email, password }) => {
    try {
        // Validate input fields
        if (!firstname || !email || !password) {
            throw new Error('All fields are required');
        }

        // Create the user
        const user = await userModel.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
        });

        return user;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

export default createUser;
