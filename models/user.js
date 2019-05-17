const mongoose = require("mongoose");

const Product = require("../models/product");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  birthday: {
    type: String,
    require: true
  },
  commentBox: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        stars:{
          type: Number
        },
        commentlist: [{
          type: String
        } ]      
      }
    ] ////7777777777777777777777777777777777777777777777777777777777777777
  },
  imageUrl: {
    type: String,
    default: "https://ucarecdn.com/5d276379-552f-4a08-97e7-744a15f71477/ava.png"
  },
  phone: {
    type: String
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date
  },
  delete_at: {
    type: Date
  },
  role: {
    type: String,
    default: "user"
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number}
      }
    ],
    sum: {
      type: Number,
      default: 0
    }
  },
  productOrder: []
});

userSchema.methods.addToCart = function(product, newQuantity) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + newQuantity;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  this.cart.sum = this.cart.sum + product.price * newQuantity;
  console.log("TCL: userSchema.methods.addToCart -> updatedCartItems", updatedCartItems)
  const updatedCart = {
    items: updatedCartItems,
    sum: this.cart.sum
  };
  this.cart = updatedCart;
  return this.save();
};


userSchema.methods.addToComment = function (product, comment, ratting) {
  
  const userCommentList = this.commentBox.items.findIndex(cp => {
  return cp.productId.toString() === product._id.toString();
  });
  console.log(comment, ratting);
  const updateComment = [...this.commentBox.items];
  //console.log("​updateComment", updateComment);

    if (userCommentList >= 0) {
      console.log("kkkk", comment);
      this.commentBox.items[userCommentList].commentlist.push(comment);
			console.log("​userSchema.methods.addToComment -> this.commentBox.items[userCommentList].commentlist", this.commentBox.items[userCommentList].commentlist);
      var temp = this.commentBox.items[userCommentList].commentlist;
			console.log("​userSchema.methods.addToComment -> temp", temp);
			console.log("​userSchema.methods.addToComment -> comment", comment);
		  //console.log("​userSchema.methods.addToComment -> this.commentBox.items[userCommentList].commentlist", this.commentBox.items[userCommentList].commentlist);
      updateComment[userCommentList].commentlist = temp;
			//console.log("​userSchema.methods.addToComment -> updateComment", updateComment);
			//console.log("​userSchema.methods.addToComment -> comment", comment);
    } else {
      updateComment.push({
        productId: product._id,
        stars: ratting,
        commentlist: [comment]
      });
    }


  //console.log("​updateComment", updateComment);
  this.commentBox.items = updateComment;


  return this.save();
};
module.exports = mongoose.model("User", userSchema);

