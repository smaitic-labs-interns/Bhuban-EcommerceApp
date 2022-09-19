const user = {
  login: {
    method: "POST",
    url: "/user/userLogin/",
  },
  register: {
    method: "POST",
    url: "/user/userRegister/",
  },
};

const product = {
  add: {
    method: "POST",
    url: "/product/addProduct/",
  },
  remove: {
    method: "delete",
    url: "/product/removeProduct/",
  },
  update: {
    method: "POST",
    url: "/product/updateProduct/",
  },
  revenue: {
    method: "GET",
    url: "/product/revenueReport/",
  },
  arAging:{
    method: "GET",
    url: "/product/arAgingReport/",
  },
  search:{
    method: "GET",
    url: "/product/searchProducts/",
  }
};

module.exports = { user, product };
