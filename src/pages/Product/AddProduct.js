import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table,
  ButtonToggle,
} from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import {
  getSize,
  getAttribute,
  getAttributeValue,
  addProduct,
  getProduct,
  getCategory,
} from "repositories/productRepository"
import { useHistory } from "react-router-dom"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"
import { select } from "redux-saga/effects"
import { object } from "prop-types"

const AddProduct = props => {
  const [hsn, sethsn] = useState("")
  const [name, setName] = useState("")
  const [category, setCategory] = useState([])
  const [minQty, setMinQty] = useState("")
  const [attVal, setAttVal] = useState([])
  const [tagTags, setTags] = useState([])
  const [description, setDescription] = useState("")
  const [refundable, setRefundable] = useState(false)
  const [refundableText, setRefundableText] = useState("")
  const [combination, setCombination] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [productImages, setProductImages] = useState([])
  const [thumbnailImg, setThumbnailImg] = useState(null)
  const [size, setSize] = useState([])
  const [sizeSelect, setSizeSelect] = useState([])

  const [attribute, setAttribute] = useState([])
  const [attributeSelect, setAttributeSelect] = useState([])
  const [cat, setCat] = useState([])
  const [catSelect, setCatSelect] = useState([])
  const [mrp, setmrp] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [offerPrice, setOfferPrice] = useState(0)
  const [categoryId, setcategoryId] = useState("")
  const [tax, setTax] = useState(0)
  const [productData, setProductData] = useState({})
  const [quantity, setQuantity] = useState(0)
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDes, setMetaDes] = useState("")
  const [metaImage, setMetaImage] = useState(null)
  const [button, setButton] = useState("Submit")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const history = useHistory()
  const [type, setType] = useState("")
  const [toggle, setToggle] = useState(false)
  const [attributeDatas, setAttributeDatas] = useState({})
  const [variation, setVariation] = useState(false)
  const [variantArr, setVariantArr] = useState([{}])
  const [test, settest] = useState([])

  useEffect(async () => {
    let typ = window.location.pathname.split("/").pop()
    if (typ == "new") {
      let resSize = await getSize({ is_all: true })
      setSize(resSize.data)
      let resAttribute = await getAttribute({ is_all: true })
      setAttribute(resAttribute.data)
      let resCategory = await getCategory({ is_all: true })
      setCat(resCategory.data)
      console.log("att", resAttribute.data)
      setButton("Update")
    } else {
      let res = await getProduct({ product_id: typ })
      setProductData(res.data)
      setButton("Update")
    }

    setType(typ)
  }, [props.success])

  const thumbImage = e => {
    let file = e.target.files[0]
    console.log("this is file thun", file)

    setThumbnailImg(file)
  }
  const metaImg = e => {
    let file = e.target.files[0]
    console.log("this is file meta", file)

    setMetaImage(file)
  }

  const imagefn = e => {
    let file = e.target.files
    console.log("this is file", file)
    setProductImages(file)
  }

  const onchngeDiscount = e => {
    console.log("offer price")

    let discount1 = e.target.value
    setDiscount(discount1)
    let offerPrice = (parseFloat(mrp) * (100 - parseFloat(discount1))) / 100
    setOfferPrice(offerPrice)
    console.log(offerPrice, "offer price")
  }
  const onChangeSize = e => {
    let selectedSizes = Array.from(e.target.selectedOptions).map(
      element => element.value
    )

    console.log("size check", selectedSizes)
    setSizeSelect(selectedSizes)
    setCombination(selectedSizes)
  }
  const onChangeCategory = e => {
    setcategoryId(e.target.value)
  }
  const onChangeAttribute = async e => {
    let selectedAttributes = Array.from(e.target.selectedOptions).map(element =>
      JSON.parse(element.value)
    )
    console.log("e attr", selectedAttributes)
    if (selectedAttributes.length > 0) {
      let val = await getAttributeValueFn(selectedAttributes)

      setAttVal(val)
    }

    setAttributeSelect(selectedAttributes)
    set
  }
  async function getAttributeValueFn(selectedAttributes) {
    let valArray = []

    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < selectedAttributes.length; i++) {
        let getVal = await getAttributeValue({
          is_all: true,
          attribute_id: selectedAttributes[i]._id,
        })
        valArray.push(getVal.data)
      }

      return resolve(valArray)
    })
  }
  const attributeValueOnchange = (e, index) => {
    let attributes = attributeDatas
    attributes[index.toString()] = Array.from(e.target.selectedOptions).map(
      ele => {
        return JSON.parse(ele.value)
      }
    )
    console.log("the hell with attributes", attributes)
    setAttributeDatas({ ...attributeDatas, attributes })
    let a = []
    Object.keys(attributes).map(ele => {
      console.log("hello", a.push(attributes[ele]))
    })
    a.pop()
    console.log("key value pair", a)
    settest(a)

    let b = a.map(ele =>
      ele.map((ele1, index1) => {
        console.log("key name", Object.keys(ele1)[0])
        let obj1 = {}
        ele1
          ? (obj1[Object.keys(ele1)[0]] =
              ele1[Object.keys(ele1)[0]].attribute_value)
          : []
        return obj1
      })
    )
    let c = sizeSelect.map(ele => {
      let obj2 = {}
      obj2["size"] = ele
      return obj2
    })
    b.push(c)
    console.log("its", b)
    let out = combine(b)
    setCombination(out)

    console.log("value check", out)
  }

  function combine(list, n = 0, result = [], current = []) {
    console.log("list", list)
    if (n === list.length) result.push(current)
    else
      list[n].forEach(item => combine(list, n + 1, result, [...current, item]))

    return result
  }

  const handleVariant = (e, index, ele) => {
    console.log("hello i ", ele)
    let variantArray = JSON.parse(JSON.stringify(variantArr))

    variantArray[index] = {
      ...variantArray[index],
      ["variant"]: Object.assign({}, ...ele),
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    }
    // console.log("this is variant array", JSON.stringify(variantArray))
    setVariantArr(variantArray)
  }

  async function handleValidSubmit(event, values) {
    if (type !== "new") {
      setSize(values.size)
      let res = await updateSize({
        size: values.size,
        size_id: type,
      })
      if (res.status == 1) {
        setSuccess(res.message)

        setTimeout(() => {
          setSuccess(null)
          setSize("")
          history.push("/sizes")
        }, 3000)
      } else {
        setError(res.message)
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    } else {
      console.log("att value", attVal)
      console.log("combination", combination)
      console.log("attribute", attribute)
      console.log("attribute select", attributeSelect)
      let tags1 = values.tags.split(",")

      sethsn(values.hsn)
      setName(values.product_name)
      setCategory(values.category)
      setMinQty(values.minimum_qty)
      setTags(tags1)
      setRefundable(values.refundable)
      setRefundableText(values.hsn)
      // setThumbnail(values.tumbnail_image)
      // setProductImages(productImages)
      setSize(values.size)
      setAttribute(values.attribute)

      setOfferPrice(values.offer_price)
      setTax(values.tax)
      setQuantity(values.quantity)
      setMetaTitle(values.meta_title)
      setMetaDes(values.meta_description)
      setMetaImage(values.meta_image)
      console.log("shehehh")

      let formD = new FormData()

      if (variantArr.length > 0) {
        // for (let i = 0; i < variantArr.length; i++) {
        //   // formD.append("product_variants", variantArr[i])
        //   formD.append("product_quantity", variantArr[i])
        //   formD.append("product_size", variantArr[i])
        //   formD.append("variant_values", variantArr[i])
        //   formD.append("product_thumb", variantArr[i])
        //   formD.append("product_image", variantArr[i])
        // }
        formD.append("variant_array", JSON.stringify(variantArr))
      }

      formD.append("hsn", values.hsn)
      formD.append("product_name", values.product_name)
      formD.append("category_id", categoryId)
      formD.append("minimum_qty", values.minimum_qty)
      formD.append("tags", JSON.stringify(tags1))
      formD.append("refundable", values.refundable)
      formD.append("refundable_text", values.hsn)
      // formD.append("cod", values.hsn)
      formD.append("meta_title", values.hsn)
      formD.append("meta_description", values.hsn)
      // formD.append("shipping_weight", values.hsn)
      // formD.append("shipping_weight_type", values.hsn)
      // formD.append("product_height", values.hsn)
      // formD.append("product_height_type", values.hsn)
      // formD.append("product_length", values.hsn)
      // formD.append("product_length_type", values.hsn)
      // formD.append("product_width", values.hsn)
      // formD.append("product_width_type", values.hsn)
      formD.append("mrp", mrp)
      formD.append("offer_price", offerPrice)
      formD.append("discount", discount)
      formD.append("tax", values.tax)
      formD.append("quantity", values.quantity)
      formD.append("product_description", description)
      for (let i = 0; i < productImages.length; i++) {
        formD.append("product_img", productImages[i])
      }

      formD.append("thumb", thumbnailImg)
      formD.append("meta_img", metaImage)

      console.log("multip,e", productImages)
      let call = await addProduct(formD)
    }
  }
  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          {error ? (
            <UncontrolledAlert color="danger" isOpen={true} dismissible>
              {error}
            </UncontrolledAlert>
          ) : null}
          {success ? (
            <UncontrolledAlert color="success" isOpen={true} dismissible>
              {success}
            </UncontrolledAlert>
          ) : null}
        </Col>
      </Row>

      <AvForm
        className="form-horizontal"
        onValidSubmit={(e, v) => {
          // console.log(v)
          handleValidSubmit(e, v)
        }}
      >
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Product Information</h4>

            <div
              className="form-group"
              style={{ marginLeft: "20px", lineHeight: "3em", width: "80%" }}
            >
              <AvField
                name="hsn"
                label="HSN"
                value={productData.hsn ? productData.hsn : ""}
                className="form-control"
                placeholder="Enter HSN"
                type="text"
                required
                grid={{ sm: 10 }}
              />
              <br />
              <AvField
                name="product_name"
                label="Product Name"
                value={productData.product_name ? productData.product_name : ""}
                className="form-control"
                placeholder="Enter Product Name"
                type="text"
                required
                grid={{ sm: 10 }}
              />
              <br />
              <AvField
                name="category"
                label="Category"
                className="form-control"
                type="select"
                placeholder="please select a category"
                defaultValue="hi"
                onChange={onChangeCategory}
                required
                // required

                grid={{ sm: 10 }}
              >
                {cat?.map((ele, index) => {
                  return (
                    <option key={index} value={ele._id}>
                      {ele.name}
                    </option>
                  )
                })}
              </AvField>
              <br />
              <AvField
                name="minimum_qty"
                label="Minimum Quantity"
                value={productData.minimum_qty ? productData.minimum_qty : ""}
                className="form-control"
                placeholder="Enter minimum quantity"
                type="text"
                required
                grid={{ sm: 10 }}
              />
              <br />
              <AvField
                name="tags"
                label="Tags"
                // value={size}
                className="form-control"
                placeholder="seperate tags using coma"
                type="text"
                required
                grid={{ sm: 10 }}
              />
              <br />
              <div style={{ display: "flex" }}>
                <div style={{ width: "17%" }}>
                  <label style={{ float: "left" }} htmlFor="">
                    Description
                  </label>
                </div>
                <div
                  style={{
                    width: "85%",
                  }}
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data=""
                    onChange={(event, editor) => {
                      const data = editor.getData()
                      setDescription(data)
                    }}
                  />
                </div>
              </div>
              <br />
              <AvField
                name="refundable"
                label="Refundable"
                // value={size}
                className="form-control"
                placeholder="Refundable"
                type="checkbox"
                grid={{ sm: 10 }}
              />
              <br />
              {/* <AvField
                name="refundable_text"
                label="Refundable Text"
                // value={size}
                className="form-control"
                placeholder="Refundable"
                type="text"
                grid={{ sm: 10 }}
              /> */}
            </div>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Product Images</h4>
            <div
              className="form-group"
              style={{ marginLeft: "20px", lineHeight: "3em", width: "80%" }}
            >
              <AvField
                name="thumbnail_image"
                label="Thumbnail Image"
                onChange={thumbImage}
                // value={size}
                className="form-control"
                type="file"
                grid={{ sm: 10 }}
              />

              <br />

              <AvField
                name="product_image[]"
                label="Product Images"
                // value={size}
                // onChange={}
                onChange={imagefn}
                className="form-control"
                type="file"
                accept="image/*"
                multiple
                grid={{ sm: 10 }}
              />
              <AvField
                name="variations"
                label="Variations"
                // value={true}
                checked={variation}
                className="form-control"
                placeholder="Refundable"
                type="checkbox"
                onChange={e => setVariation(!variation)}
                grid={{ sm: 10 }}
              />
            </div>
          </CardBody>
        </Card>
        <br />
        {variation ? (
          <Card>
            <CardBody>
              <h4 className="card-title mb-4">Product Variations</h4>
              <div
                className="form-group"
                style={{ marginLeft: "20px", lineHeight: "3em", width: "80%" }}
              >
                <AvField
                  name="size"
                  label="Size"
                  // value={size}
                  className="form-control"
                  type="select"
                  multiple
                  onChange={onChangeSize}
                  // required

                  grid={{ sm: 10 }}
                >
                  {size.map((ele, index) => {
                    return (
                      <option key={index} value={ele.size}>
                        {ele.size}
                      </option>
                    )
                  })}
                </AvField>
                <br />
                {sizeSelect.length > 0 ? (
                  <AvField
                    name="attributes"
                    label="Attributes"
                    // value={size}
                    className="form-control"
                    multiple
                    type="select"
                    onChange={e => onChangeAttribute(e)}
                    grid={{ sm: 10 }}
                  >
                    <br />
                    {attribute
                      ? attribute.map(ele => {
                          return (
                            <option value={JSON.stringify(ele)}>
                              {" "}
                              {ele.attribute_name}
                            </option>
                          )
                        })
                      : ""}
                  </AvField>
                ) : (
                  ""
                )}
                <br />
                {attributeSelect.length > 0 && sizeSelect.length > 0
                  ? attributeSelect.map((ele, index) => {
                      return (
                        <div className="form-group">
                          <AvField
                            name={ele._id}
                            label={ele.attribute_name}
                            // value={size}
                            className="form-control"
                            multiple
                            onChange={e => attributeValueOnchange(e, index)}
                            type="select"
                            grid={{ sm: 10 }}
                          >
                            {attVal[index]?.map(ele1 => {
                              let obj = {}
                              obj[ele.attribute_name] = ele1
                              console.log(obj, "obj")
                              return (
                                <option value={JSON.stringify(obj)}>
                                  {" "}
                                  {ele1.attribute_value}
                                </option>
                              )
                            })}
                          </AvField>
                          <br />
                        </div>
                      )
                    })
                  : ""}
              </div>
              <br />
              {combination.length > 0 ? (
                <div className="form-group">
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Variant</th>
                        <th>Variant Price</th>
                        <th>Quantity</th>
                        <th>Thumbnail Image</th>
                        <th>variant Image</th>
                      </tr>
                    </thead>
                  </Table>
                </div>
              ) : (
                ""
              )}
              <br />
              <div className="table-responsive">
                <Table hover>
                  {combination
                    ? combination.map((ele, index) => {
                        return (
                          <div className="form-group">
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>

                              <td>
                                {Object.values(Object.assign({}, ...ele)).join(
                                  "-"
                                )}
                              </td>
                              <td>
                                <input
                                  name="variant_price"
                                  type="text"
                                  className="form-control"
                                  onChange={e => handleVariant(e, index, ele)}
                                />
                              </td>
                              <td>
                                <input
                                  name="variant_quantity"
                                  type="text"
                                  className="form-control"
                                  onChange={e => handleVariant(e, index, ele)}
                                />
                              </td>
                              <td>
                                <input
                                  name="variant_thumb"
                                  type="file"
                                  className="form-control"
                                  onChange={e => handleVariant(e, index, ele)}
                                />
                              </td>
                              <td>
                                <input
                                  name="variant_image"
                                  type="file"
                                  className="form-control"
                                  onChange={e => handleVariant(e, index, ele)}
                                />
                              </td>
                            </tr>
                          </div>
                        )
                      })
                    : ""}
                </Table>
              </div>
            </CardBody>
          </Card>
        ) : (
          ""
        )}
        <br />
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Product Price and stocks</h4>
            <div
              className="form-group"
              style={{ marginLeft: "20px", lineHeight: "3em", width: "80%" }}
            >
              <div style={{ display: "flex" }}>
                <label htmlFor="" style={{ display: "inline-block" }}>
                  MRP
                </label>
                <input
                  type="text"
                  defaultValue={productData.mrp ? productData.mrp : ""}
                  style={{ width: "85%", height: "10%", marginLeft: "100px" }}
                  className="form-control"
                  onChange={e => setmrp(e.target.value)}
                />
              </div>
              {/* <AvField
                name="mrp"
                label="MRP"
                // onchange={}
                // value={size}
                className="form-control"
                type="text"
                placeholder="0"
                required
                grid={{ sm: 10 }}
              /> */}
              <br />
              <div style={{ display: "flex" }}>
                <label htmlFor="" style={{ display: "inline-block" }}>
                  Discount
                </label>
                <input
                  type="text"
                  defaultValue={
                    productData.discount ? productData.discount : ""
                  }
                  style={{ width: "85%", height: "10%", marginLeft: "70px" }}
                  className="form-control"
                  onChange={onchngeDiscount}
                />
              </div>
              {/* <AvField
                name="discount"
                label="Discount"
                onchange={onchngeDiscount}
                // // value={size}
                className="form-control"
                type="select"
                placeholder="0"
                required
                grid={{ sm: 10 }}
              /> */}

              <br />

              <AvField
                name="offer_price"
                label="Offer Price"
                value={
                  productData.offer_price ? productData.offer_price : offerPrice
                }
                className="form-control"
                type="text"
                placeholder="0"
                disabled
                grid={{ sm: 10 }}
              />
              <br />

              <AvField
                name="tax"
                label="Tax Percentage"
                value={productData.tax ? productData.tax : ""}
                className="form-control"
                type="text"
                placeholder="0"
                required
                grid={{ sm: 10 }}
              />
              <br />

              <AvField
                name="quantity"
                label="Quantity"
                value={productData.quantity ? productData.quantity : ""}
                className="form-control"
                type="text"
                placeholder="0"
                required
                grid={{ sm: 10 }}
              />
              <br />
            </div>
          </CardBody>
        </Card>
        <br />
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Meta Details</h4>
            <div
              className="form-group"
              style={{ marginLeft: "20px", lineHeight: "3em", width: "80%" }}
            >
              <AvField
                name="meta_title"
                label="Meta Title"
                value={productData.meta_title ? productData.meta_title : ""}
                className="form-control"
                type="text"
                placeholder="Enter Meta Title"
                grid={{ sm: 10 }}
              />
              <br />

              <AvField
                name="meta_description"
                label="Meta Description"
                value={
                  productData.meta_description
                    ? productData.meta_description
                    : ""
                }
                className="form-control"
                type="textarea"
                placeholder="Enter Meta Description"
                grid={{ sm: 10 }}
              />
              <br />

              <AvField
                name="meta_image"
                label="Meta Image"
                onChange={metaImg}
                // value={size}
                className="form-control"
                type="file"
                grid={{ sm: 10 }}
              />
              <br />
            </div>
          </CardBody>
        </Card>

        <div className="text-center mt-4">
          <Button type="submit" color="primary" size="lg">
            {button}
          </Button>
        </div>
        <br />
      </AvForm>
    </React.Fragment>
  )
}

export default AddProduct
