package controllers

import javax.inject._
import models.{ProductFormRequest, ProductRepository}
import play.api.libs.json.{JsError, JsValue, Json}
import play.api.mvc._
import com.typesafe.scalalogging.StrictLogging

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}

@Singleton
class ProductController @Inject()(cc: ControllerComponents, productRepo: ProductRepository)(implicit ec: ExecutionContext)
  extends AbstractController(cc) with StrictLogging {

  def addProduct: Action[JsValue] = Action.async(parse.json) { request =>
    request.body.validate[ProductFormRequest].fold(error => Future.successful(BadRequest(JsError.toJson(error))),
      { productFormRequest =>
        logger.info("Adding product with name ..", productFormRequest.name)
        productRepo.addProduct(productFormRequest).map { createdId =>
          productRepo.addProductDetails(createdId, productFormRequest.details)
          Ok(Json.toJson(Map("id" -> createdId)))
        }
      })
  }

  def getAllProducts: Action[AnyContent] = Action.async { implicit request =>
    logger.info("Fetching all products ..")
    Try {
      productRepo.listAllProducts()
    } match {
      case Success(products) =>
        logger.debug("Successfully fetched all products ..")
        products.map { product => Ok(Json.toJson(product)) }
      case Failure(exception) =>
        logger.error("Failed to fetch all products", exception)
        Future.failed(exception)
    }
  }

  def getProductDetails(product_id: Long): Action[AnyContent] = Action.async { implicit request =>
    logger.info("Getting details of the product : " + product_id)
    productRepo.getDetailsFromProduct(product_id).map { product =>
      Ok(Json.toJson(product))
    }
  }

  def updateProduct(product_id: Long): Action[JsValue] = Action.async(parse.json) { request =>
    request.body.validate[ProductFormRequest].fold(error => Future.successful(BadRequest(JsError.toJson(error))),
      { productFormRequest =>
        productRepo.updateProduct(product_id, productFormRequest).map { noOfRowsUpdated =>
          logger.info("Product updated successfully " + noOfRowsUpdated)
          //Deleting details and adding new details - can be updated as well
          productRepo.deleteProductDetails(product_id);
          productRepo.addProductDetails(product_id, productFormRequest.details)
          Ok(Json.toJson(Map("rowsUpdated" -> noOfRowsUpdated)))
        }
      })
  }

  def deleteProduct(id: Long): Action[AnyContent] = Action.async { implicit request =>
    logger.info("Deleting product with id : " + id)
    productRepo.deleteProduct(id) map { noOfRowsDeleted => Ok(Json.toJson(Map("rowsDeleted" -> noOfRowsDeleted))) }
  }

  def productNames(productName: String): Action[AnyContent] = Action.async { implicit request =>
    productRepo.productsByName(productName) map { names => Ok(Json.toJson(names)) }
  }

}
