import Joi from "joi";

export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords do not match",
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: true });

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};


/* LOGIN VALIDATION */
export const validateLogin = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
  
    next();
  };


