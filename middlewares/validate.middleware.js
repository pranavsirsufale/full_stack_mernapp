//? await schema.parseAsync(req.body) is the line where you use zod validate the request body data against the defined schmea.
//https://github.com/colinhacks/zod#paraseasync

// `parse(data : unknonw) : %`

//? Given any zod shcmea, you can call its '.parse' method to check 'data' is valid. if it is, a value is retunred with full type information! Otherwise, an error is thrown.

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.errors[0].message;
    next({ status, message, extraDetails });
  }
};

export { validate };
