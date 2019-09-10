const itemDetailsArray = [{
    title: "Blue T-Shirt",
    sku: "SKUSHIRT1",
    qty: 1,
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
    qty: 1,
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
    qty: 1,
    price: 12199,
    image: "https://images.freeimages.com/images/large-previews/69b/shoes-1422843.jpg",
    tags: ["womens", "color-red", "material-leather", "category-footwear", "subtype-flats", "price-101-150"],
    url: "http://example.com/red_flats",
    vars: {
      gender: "womens",
      basePrice: 12199 }
  }];

const testSectionCommerce = '{"recommendations": [{url:"http://example.com/hat", title:"Hat", image:"https://images.freeimages.com/images/large-previews/420/black-hat-1417068.jpg"}, {url:"http://example.com/shoes", title:"Shoes", image:"https://images.freeimages.com/images/large-previews/64b/shoes-1555048.jpg"}, {url:"http://example.com/pants", title:"Pants", image:"https://images.freeimages.com/images/large-previews/728/jeans-1421398.jpg"}]}';

const testSectionMedia = '{"recommendations": [{url:"http://example.com/politics", title:"Politics", image:"https://images.freeimages.com/images/large-previews/4f2/german-reichstag-1515628.jpg"}, {url:"http://example.com/tech", title:"Tech", image:"https://images.freeimages.com/images/large-previews/2c2/hi-tech-1-1554527.jpg"}, {url:"http://example.com/movies", title:"Movies", image:"https://images.freeimages.com/images/large-previews/587/disco-ball-1421094.jpg"}]}';

export { itemDetailsArray, testSectionCommerce, testSectionMedia };