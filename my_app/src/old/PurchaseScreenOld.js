let userCart = [];

const getCartData = async () => {
  try {
    const value = await AsyncStorage.getItem("@current_cart");
    if (value) {
      userCart = JSON.parse(value).userCartParsed;
      alert(userCart.length)
    }
  } catch(e) {
    alert(`Something went wrong: ${e}.`);
  }
}

const storeCartData = async (item) => {
  getCartData();

  userCart.push(item);

  cartLengthTicker(userCart.length);

  let totalCartValue = 0;
  userCart.forEach(item => {
    totalCartValue = totalCartValue + (item.vars.basePrice * item.qty);
  });

  cartValueTicker(totalCartValue);

  const userCartObject = { userCartParsed: userCart };
  try {
    await AsyncStorage.setItem("@current_cart", JSON.stringify(userCartObject));
  } catch (e) {
    alert("Something went wrong!");
  }
}

const [currentCartLength, cartLengthTicker] = useState(0);
const [currentCartValue, cartValueTicker] = useState(0);
const [lifetimeValue, lifetimeValueTicker] = useState(0);

let newCartValue = 0;

const addToCart = (item) => {
  storeCartData(item);
  if (currentCart.length > 0) {
    const currentItems = [];
    currentCart.forEach(cartItem => {
      currentItems.push(cartItem.title);
    });
    if (!currentItems.includes(item.title)) {
      currentCart.push(item);
      cartLengthTicker(currentCart.length);
      newCartValue = newCartValue + item.vars.basePrice * item.qty;
      cartValueTicker(newCartValue);
    }
    else {
      alert("This item is already in your cart!");
      return false;
    }
  }
  else {
    currentCart.push(item);
    cartLengthTicker(currentCart.length);
    newCartValue = newCartValue + (item.vars.basePrice * item.qty);
    cartValueTicker(newCartValue);
  }
  const logType = "logAbandonedCart";
  alert(`${currentCart.length} item${currentCart.length > 1 ? "s are" : " is"} in your cart, ${logType}`);
};

const removeFromCart = (item) => {
  const newCart = [];
  currentCart.forEach(cartItem => {
    if (cartItem.sku != item.sku) {
      newCart.push(cartItem);
    }
    else {
      newCartValue = newCartValue - (item.vars.basePrice * item.qty);
      cartValueTicker(newCartValue);
    }
  });
  currentCart = newCart;
  cartLengthTicker(currentCart.length);
  if (currentCart.length != 0) {
    const logType = "logAbandonedCart";
    alert(`${currentCart.length} item${currentCart.length > 1 ? "s are" : " is"} now in cart, ${logType}`);
  }
  else {
    alert("Your cart is now empty.");
  }
  cartLengthTicker(currentCart.length);
};

const purchase = () => {
  let totalPurchaseValue = 0;
  currentCart.forEach(item => {
    totalPurchaseValue = totalPurchaseValue + (item.vars.basePrice * item.qty);
  });
  const logType = "logPurchase";
  alert(`${currentCart.length} items purchased for $${totalPurchaseValue/100}, ${logType}`);
  clearCart();
};

const clearCart = () => {
  currentCart = [];
  cartLengthTicker(0);
  cartValueTicker(0);
};