const Joi = require("joi");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/services");
const userRoutes = [
  {
    method: "POST",
    path: "/users",
    handler: async (request, h) => {
      const { name, email, age } = request.payload;
      const user = await createUser(name, email, age);
      return h.response(user).code(201);
    },
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          age: Joi.number().integer().min(0).required(),
        }),
      },
    },
  },

  {
    method: "GET",
    path: "/users",
    handler: async (request, h) => {
      const users = await getUsers();
      return h.response(users);
    },
  },
  {
    method: "GET",
    path: "/users/{id}",
    handler: async (request, h) => {
      const id = parseInt(request.params.id);
      const user = await getUserById(id);
      if (!user) {
        return h.response().code(404);
      }
      return h.response(user);
    },
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: async (request, h) => {
      const id = parseInt(request.params.id);
      const { name, email, age } = request.payload;
      const user = await updateUser(id, name, email, age);
      if (!user) {
        return h.response().code(404);
      }
      return h.response(user);
    },
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          age: Joi.number().integer().min(0).required(),
        }),
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
    },
  },

  {
    method: "DELETE",
    path: "/users/{id}",
    handler: async (request, h) => {
      const id = parseInt(request.params.id);
      const user = await deleteUser(id);
      if (!user) {
        return h.response().code(404);
      }
      return h.response(user);
    },
  },
];
module.exports = userRoutes;
