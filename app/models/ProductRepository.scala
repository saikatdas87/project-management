package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}


@Singleton
class ProductRepository @Inject()(dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._


  private class ProductTable(tag: Tag) extends Table[Product](tag, "product") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def category = column[String]("category")

    def code = column[String]("code")

    def price = column[Double]("price")

    def * = (id, name, category, code, price) <> ((Product.apply _).tupled, Product.unapply)

  }

  private val products = TableQuery[ProductTable]


  private class DetailsTable(tag: Tag) extends Table[Details](tag, "details") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def key = column[String]("key")

    def value = column[String]("value")

    def productId = column[Long]("product_id")

    def productFk = foreignKey("product_id_FK", productId, TableQuery[ProductTable])(_.id, ForeignKeyAction.Restrict, ForeignKeyAction.Cascade)

    def * = (id, key, value, productId) <> ((Details.apply _).tupled, Details.unapply)

  }

  private val details = TableQuery[DetailsTable]


  def addProduct(productForm: ProductFormRequest): Future[Long] = {
    db.run(products returning products.map(_.id) += Product(productForm.id, productForm.name, productForm.category, productForm.code, productForm.price.getOrElse(0)))
  }

  def addProductDetails(product_id: Long, productDetails: List[Details]): Unit = productDetails.foreach(x => {
    db.run(details returning details.map(_.id) += Details(x.id, x.key, x.value, product_id))
  })

  def updateProduct(id: Long, productForm: ProductFormRequest): Future[Int] = db.run {
    products.filter(_.id === productForm.id).update(Product(productForm.id, productForm.name, productForm.category, productForm.code, productForm.price.getOrElse(0)))
  }

  def listAllProducts(): Future[Seq[Product]] = db.run {
    products.sortBy(_.id.desc).result.asTry
  }.map {
    case Failure(ex) => throw ex
    case Success(products) => products
  }

  def deleteProduct(id: Long): Future[Int] = {
    db.run(products.filter(_.id === id).delete)
  }

  def deleteProductDetails(id: Long): Future[Int] = {
    db.run(details.filter(_.productId === id).delete)
  }

  def getDetailsFromProduct(id: Long): Future[Seq[Details]] = db.run(details.filter(_.productId === id).result.asTry).map {
    case Failure(ex) => {
      throw ex
    }
    case Success(details) => details
  }

  def productsByName(productName: String): Future[Seq[String]] = db.run(products.filter(_.name.toLowerCase.like(s"%${productName.toLowerCase}%")).map(_.name).result)
}
