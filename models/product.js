class Product {
  constructor(title, imgUrl, price, descriptions){
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.descriptions = descriptions;
  }

  save(){
    
  }
}

const Product = sequelize.define("products", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descriptions: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
