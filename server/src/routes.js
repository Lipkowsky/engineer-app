const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");

const isAuthenticated = require("./policies/isAuthenticated");
const isAdminAuthenticated = require("./policies/isAdminAuthenticated");
const AdminController = require("./controllers/AdminController");
const ProductController = require("./controllers/ProductController");

module.exports = app => {
  app.post(
    "/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );

  app.post("/login", AuthenticationController.login);

  app.get("/protect", isAuthenticated, AdminController.showUsers);

  app.post(
    "/admin/createSector",
    isAdminAuthenticated,
    AdminController.createSector
  );

  app.post(
    "/admin/createDuty",
    isAdminAuthenticated,
    AdminController.createDuty
  );

  app.post(
    "/admin/createSupplier",
    isAdminAuthenticated,
    AdminController.createSupplier
  );

  app.get("/allProducts", isAuthenticated, ProductController.allProducts);

  app.post(
    "/createProduct",
    isAdminAuthenticated,
    ProductController.createProduct
  );

  app.put(
    "/deleteProduct",
    isAdminAuthenticated,
    ProductController.deleteProduct
  );

  

  app.put("/update", isAuthenticated, ProductController.takePiecesOfProduct);

  app.post(
    "/getUserDuty",
    isAuthenticated,
    AuthenticationController.getUserDuty
  );

  app.post("/getUserSector", AuthenticationController.getUserSector);

  app.get("/admin/allUsers", isAdminAuthenticated, AdminController.getAllUsers);

  app.get(
    "/admin/allSectors",
    isAdminAuthenticated,
    AdminController.getAllSectors
  );

  app.get(
    "/admin/allDuties",
    isAdminAuthenticated,
    AdminController.getAllDuties
  );

  app.put(
    "/admin/updateSectorId",
    isAdminAuthenticated,
    AdminController.changeUserSector
  );

  app.put(
    "/admin/updateDutyId",
    isAdminAuthenticated,
    AdminController.changeUserDuty
  );

  app.get(
    "/checkIsEnoughProducts",
    isAuthenticated,
    ProductController.checkIsEnoughProducts
  );

  app.post("/sendEmail", isAuthenticated, ProductController.sendEmail);

  app.post("/addPieces", isAuthenticated, ProductController.addPiecesOfProduct);

  app.put(
    "/changeProductSector",
    isAuthenticated,
    ProductController.changeProductSector
  );
};
