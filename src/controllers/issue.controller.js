import status from "http-status";
import db from "../models/index.js";
import Joi from "joi";
import { extractSequelizeData } from "../utils/sequelize.util.js";
import {
  omitDeletedAtProperties,
  omitPasswordProperty,
  transformCamelToSnake,
} from "../utils/format.util.js";

const { User, Role, Issue, Status } = db;

// Validation schema
const addIssueSchema = Joi.object({
  subject: Joi.string().required(),
  description: Joi.string().required(),
});

export const addIssue = async (req, res) => {
  try {
    const { error } = addIssueSchema.validate(req.body);
    if (error) {
      return res.status(status.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newIssue = await Issue.create({
      subject: req.body.subject,
      description: req.body.description,
      statusId: 1,
      requesterId: req.authenticatedUser.id,
    });

    const addedIssue = await Issue.findByPk(newIssue.id, {
      include: [
        { model: Status },
        { model: User, as: "requester", include: [{ model: Role }] },
        { model: User, as: "resolver", include: [{ model: Role }] },
      ],
    });

    return res.status(status.CREATED).json({
      success: true,
      data: transformCamelToSnake(
        omitDeletedAtProperties(
          omitPasswordProperty(extractSequelizeData(addedIssue))
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

export const getAllIssue = async (req, res) => {
  try {
    // cek user
    const user = transformCamelToSnake(
      extractSequelizeData(
        await User.findByPk(req.authenticatedUser.id, {
          include: [{ model: Role }],
        })
      )
    );

    let issue = [];
    if (user.role.name == "admin") {
      issue = await Issue.findAll({
        include: [
          { model: Status },
          { model: User, as: "requester", include: [{ model: Role }] },
          { model: User, as: "resolver", include: [{ model: Role }] },
        ],
      });
    } else {
      issue = await Issue.findAll({
        where: {
          requesterId: user.id,
        },
        include: [
          { model: Status },
          { model: User, as: "requester", include: [{ model: Role }] },
          { model: User, as: "resolver", include: [{ model: Role }] },
        ],
      });
    }

    return res.status(status.OK).json({
      success: true,
      data: transformCamelToSnake(
        omitDeletedAtProperties(
          omitPasswordProperty(extractSequelizeData(issue))
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

export const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findByPk(id, {
      include: [
        { model: Status },
        { model: User, as: "requester", include: [{ model: Role }] },
        { model: User, as: "resolver", include: [{ model: Role }] },
      ],
    });

    return res.status(status.OK).json({
      success: true,
      data: transformCamelToSnake(
        omitDeletedAtProperties(
          omitPasswordProperty(extractSequelizeData(issue))
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
