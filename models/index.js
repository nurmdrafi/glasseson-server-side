const User = require("./userModel"),
  Blog = require("./blogModel"),
  Image = require("./imageModel"),
  Comment = require("./commentModel"),
  Product = require("./productModel"),
  Discount = require("./discountModel");

// TODO: import all models
const models = { User, Blog, Image, Comment, Product, Discount };

module.exports = models;
