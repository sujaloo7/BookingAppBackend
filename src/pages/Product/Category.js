import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { Row, Col, Card, Alert, CardBody, Media, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import {
  addCategory,
  getCategory,
  updateCategory,
} from "repositories/productRepository"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

const Category = props => {
  const [email, setemail] = useState("")
  const [cat, setCat] = useState("")
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [username, setUserName] = useState("")
  const [categoryImg, setCategoryImg] = useState(null)
  const [adminId, setAdminId] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [type, setType] = useState("")
  const [button, setButton] = useState("SUBMIT")

  useEffect(async () => {
    let typ = window.location.pathname.split("/").pop()
    if (typ !== "new") {
      let res = await getCategory({ category_id: typ })
      setCat(res.data.name)
      setButton("Update")
    }
    setType(typ)
  }, [props.success])

  useEffect(() => {}, [])

  const categoryOnchange = e => {
    let file = e.target.files[0]
    setCategoryImg(file)
    console.log("props", process.env.IMAGE_URL)
  }
  const handleValidSubmit = async (event, value) => {
    if (type !== "new") {
      setCat(value.categoryname)
      let res = await updateCategory({
        name: value.categoryname,
        category_id: type,
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
    }
    console.log(value)
    setCat(value.categoryname)
    let formD = new FormData()
    formD.append("name", value.categoryname)
    formD.append("file", categoryImg)
    console.log(formD)
    let res = await addCategory(formD)
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

      <h4 className="card-title mb-4">Add Category</h4>

      <Card>
        <CardBody>
          <AvForm
            className="form-horizontal"
            onValidSubmit={(e, v) => {
              handleValidSubmit(e, v)
            }}
          >
            <div className="form-group">
              <AvField
                name="categoryname"
                label="Category Name"
                value={cat}
                className="form-control"
                placeholder="Enter Category Name"
                type="text"
                required
              />
              <br />
              <AvField
                name="imagename"
                label="Category Image"
                value={lname}
                onChange={categoryOnchange}
                className="form-control"
                type="file"
                required
              />
            </div>
            <div className="text-center mt-4">
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </AvForm>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Category
