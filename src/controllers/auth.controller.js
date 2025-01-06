import status from "http-status";
import db from "../models/index.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  omitDeletedAtProperties,
  omitPasswordProperty,
  transformCamelToSnake,
  transformSnakeToCamel,
} from "../utils/format.util.js";
import { extractSequelizeData } from "../utils/sequelize.util.js";
import { JWT_SECRET } from "../utils/env.util.js";

const { User, Role } = db;

// Validation schema
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(6).required(), // Min 6 karakter
  roleId: Joi.number().integer().optional(),
});
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(), // Min 6 karakter
});

export const registerUser = async (req, res) => {
  try {
    const admin = await User.findOne({
      where: { id: req.authenticatedUser.id },
      include: [
        {
          model: Role,
          where: {
            name: "admin",
          },
        },
      ],
    });
    if (!admin) {
      return res.status(status.UNAUTHORIZED).json({
        success: false,
        message: "You're not admin.",
      });
    }

    // Validate input
    const { error } = registerSchema.validate(transformSnakeToCamel(req.body));
    if (error) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Check for duplicate username
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUser) {
      return res.status(status.CONFLICT).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
      ...transformSnakeToCamel(req.body),
      password: hashedPassword,
      isActive: true,
    };

    // Create new user
    const newUser = await User.create(userData);
    const addedUser = await User.findByPk(newUser.id, {
      include: [{ model: Role }],
    });

    return res.status(status.CREATED).json({
      success: true,
      data: transformCamelToSnake(
        omitDeletedAtProperties(
          omitPasswordProperty(extractSequelizeData(addedUser))
        )
      ),
    });
  } catch (error) {
    console.error(error);
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    // validate
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // find user
    const user = await User.findOne({
      where: { username: req.body.username },
      include: [{ model: Role }],
    });
    if (!user) {
      return res.status(status.UNAUTHORIZED).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // check password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(status.UNAUTHORIZED).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // generate jwt
    const token = jwt.sign(
      { id: user.id, username: user.username, name: user.name }, // payload
      JWT_SECRET,
      { expiresIn: "1d", issuer: "issue-tracker" }
    );

    return res.status(status.OK).json({
      success: true,
      message: "Login successful",
      token,
      user: transformCamelToSnake(
        omitDeletedAtProperties(
          omitPasswordProperty(extractSequelizeData(user))
        )
      ),
    });
  } catch (error) {
    console.error(error);
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.authenticatedUser.id },
      include: [{ model: Role }],
    });
    if (!user) {
      return res.status(status.UNAUTHORIZED).json({
        success: false,
        message: "User not found.",
      });
    }

    const token = req.headers.authorization?.split(" ")[1];

    return res.status(status.OK).json({
      success: true,
      message: "Check auth successful",
      token,
      user: transformCamelToSnake(
        omitDeletedAtProperties(
          omitPasswordProperty(extractSequelizeData(user))
        )
      ),
    });
  } catch (error) {
    console.error(error);
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
