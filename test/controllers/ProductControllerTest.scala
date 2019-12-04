package controllers

import models.{Details, Product, ProductFormRequest, ProductRepository}
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json.Json
import play.api.mvc.Result
import play.api.test.Helpers._
import play.api.test._

import scala.concurrent.{ExecutionContextExecutor, Future}

class ProductControllerTest extends PlaySpec with GuiceOneAppPerTest with Injecting with MockitoSugar {

  private val repo: ProductRepository = mock[ProductRepository]
  private implicit val executor: ExecutionContextExecutor = scala.concurrent.ExecutionContext.global
  private val productController = new ProductController(stubControllerComponents(), repo)
  private val details = List(Details(0, "power", "300W", 0), Details(0, "channel", "4.1", 0))
  private val productForm: ProductFormRequest = ProductFormRequest(0, "LG SJ8S", "Soundbar", "lg-sj8s", Some(199), details)
  private val product = Product(1047, "LG SJ8S", "Soundbar", "lg-sj8s", 199)

  "ProductController " should {

    "addProduct" in {
      when(repo.addProduct(productForm)) thenReturn Future.successful(11L)
      val result: Future[Result] = productController.addProduct()(FakeRequest().withBody(Json.toJson(productForm)))
      val resultAsString: String = contentAsString(result)
      resultAsString must equal("""{"id":11}""")
    }

    "getAllProducts" in {
      when(repo.listAllProducts()) thenReturn Future.successful(List(product))
      val result = productController.getAllProducts()(FakeRequest())
      contentAsString(result) must equal("""[{"id":1047,"name":"LG SJ8S","category":"Soundbar","code":"lg-sj8s","price":199}]""")
    }

    "updateProduct" in {
      val productId = 1111L
      when(repo.updateProduct(productId, productForm)).thenReturn(Future.successful(1))
      val result: Future[Result] = productController.updateProduct(productId)(FakeRequest().withBody(Json.toJson(productForm)))
      contentAsString(result) must equal("""{"rowsUpdated":1}""")
    }

    "deleteProduct" in {
      val productId = 1111L
      when(repo.deleteProduct(productId)).thenReturn(Future.successful(1))
      val result = productController.deleteProduct(productId)(FakeRequest())
      contentAsString(result) must equal("""{"rowsDeleted":1}""")
    }

    "getProductDetails" in {
      val productId = 1111L
      when(repo.getDetailsFromProduct(productId)).thenReturn(Future.successful(details))
      val result = productController.getProductDetails(productId)(FakeRequest())
      contentAsString(result) must equal(Json.toJson(details).toString)
    }

    "productNames" in {
      val productName = "LG"
      when(repo.productsByName(productName)).thenReturn(Future.successful(List("LG SJ8S")))
      val result = productController.productNames(productName)(FakeRequest())
      contentAsString(result) must equal("""["LG SJ8S"]""")
    }
  }


}
