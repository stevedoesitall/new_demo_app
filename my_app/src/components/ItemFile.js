import Carnival from "react-native-carnival";

const itemDetailsArray = [{
  title: "Blue T-Shirt",
  sku: "SKUSHIRT1",
  price: 1599,
  image: "https://images.freeimages.com/images/large-previews/36d/t-shirt-1426871.jpg",
  tags: ["unisex", "color-blue", "material-cotton", "category-shirts", "subtype-tshirt", "price-11-20"],
  url: "http://example.com/blue_tshirt",
  vars: {
    gender: "unisex",
    basePrice: 1599 }
  },
  {
  title: "Black Chelsea Boots",
  sku: "SKUBOOTS2",
  price: 19999,
  image: "https://images.freeimages.com/images/large-previews/990/boots-2-1426166.jpg",
  tags: ["mens", "color-black", "material-leather", "category-footwear", "subtype-boots", "price-151-200"],
  url: "http://example.com/black_chelsea_boots",
  vars: {
    gender: "mens",
    basePrice: 19999 },
  },
  {
  title: "Red Flats",
  sku: "SKUFLATS3",
  price: 12199,
  image: "https://images.freeimages.com/images/large-previews/69b/shoes-1422843.jpg",
  tags: ["womens", "color-red", "material-leather", "category-footwear", "subtype-flats", "price-101-150"],
  url: "http://example.com/red_flats",
  vars: {
    gender: "womens",
    basePrice: 12199 }
}];

const sectionIdCommerce = "fc2b679a-d0bf-11e9-a006-002590d1a41a";
const sectionIdMedia = "0af7e114-d038-11e9-b727-002590d1a2f6";

const itemRecs = [];
const articleRecs = [];
const itemURLs = [];
const articleURLs = [];

const getItemRecs = () => {
  Carnival.getRecommendations(sectionIdCommerce).then(function(recs) {
    recs.forEach(rec => {
      itemRecs.push(rec);
      itemURLs.push(rec.url);
    });
  }, function(error) {
    console.log(error);
  });
};

const getArticleRecs = () => {
  Carnival.getRecommendations(sectionIdMedia).then(function(recs) {
    recs.forEach(rec => {
      articleRecs.push(rec);
      articleURLs.push(rec.url);
    });
  }, function(error) {
    console.log(error);
  });
};

getItemRecs();
getArticleRecs();

export { itemRecs, articleRecs, itemDetailsArray, sectionIdMedia, sectionIdCommerce, itemURLs, articleURLs };