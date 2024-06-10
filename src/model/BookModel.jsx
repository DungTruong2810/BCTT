class BookModel {
    constructor(
      idBook,
      nameBook,
      author,
      isbn,
      description,
      listPrice,
      sellPrice,
      quantity,
      avgRating,
      soldQuantity,
      discountPercent,
      thumbnail
    ) {
      this.idBook = idBook
      this.nameBook = nameBook
      this.author = author
      this.isbn = isbn
      this.description = description
      this.listPrice = listPrice
      this.sellPrice = sellPrice
      this.quantity = quantity
      this.avgRating = avgRating
      this.soldQuantity = soldQuantity
      this.discountPercent = discountPercent
      this.thumbnail = thumbnail
    }
  }
  
  export default BookModel
  