const { Schema, model } = require('../connection');

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Boolean, default: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = model('Products', productSchema);
// the collection will be named 'product' in the database.