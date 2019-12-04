package models

import play.api.libs.json.{Json, OFormat}

case class Product(id: Long,
                   name: String,
                   category: String,
                   code: String,
                   price: Double)

object Product {
  implicit val productFormat: OFormat[Product] = Json.format[Product]
}

case class Details(id: Long,
                   key: String,
                   value: String,
                   product_id: Long)

object Details {
  implicit val productFormat: OFormat[Details] = Json.format[Details]
}

case class ProductFormRequest(id: Long,
                              name: String,
                              category: String,
                              code: String,
                              price: Option[Double],
                              details: List[Details])

object ProductFormRequest {
  implicit val productFormat: OFormat[ProductFormRequest] = Json.format[ProductFormRequest]
}
