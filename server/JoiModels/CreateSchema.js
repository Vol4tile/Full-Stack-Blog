import Joi from "joi";

export const signUpSchema = Joi.object({
  fullname: Joi.string().min(2).max(30).required(),
  username: Joi.string().min(1).max(16).required(),
  password: Joi.string().min(8).max(32).required(),
  email: Joi.string().email().required().max(100),
});

export const signInSchema = Joi.object({
  username: Joi.string().min(1).max(16).required(),
  password: Joi.string().min(8).max(32).required(),
});

export const changeFullnameSchema = Joi.string().min(2).max(30).required();

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).max(32).required(),
  newPassword: Joi.string().min(8).max(32).required(),
  newPasswordAgain: Joi.string().min(8).max(32).required(),
});

export const createPostSchema = Joi.object({
  baslik: Joi.string().min(3).max(32).required(),
  yazi: Joi.string().min(20).max(5000).required(),
});

export const selectedPostSchema = Joi.object({
  postId: Joi.string().min(1).max(100).required(),
});

export const offsetsSchema = Joi.object({
  offset: Joi.number().min(0).required(),
});

export const changeMailSchema = Joi.string().email().required().max(100);
