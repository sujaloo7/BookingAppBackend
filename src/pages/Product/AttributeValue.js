import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button, Table } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import {
  addAttributeValue,
  updateAttributeValue,
  getAttributeValue,
  getAttribute,
} from "repositories/productRepository"
import { useHistory, Link } from "react-router-dom"
import { AiOutlineDelete, AiFillSetting } from "react-icons/ai"
import { AiFillEdit } from "react-icons/ai"
import ReactPaginate from "react-paginate"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const AttributeValue = props => {
  const [attributeValueList, setAttributeValueList] = useState([])
  const [attribute, setAttribute] = useState("")
  const [attributeValue, setAttributeValue] = useState("")
  const [adminId, setAdminId] = useState("")
  const [sizeId, setSizeId] = useState("")
  const [button, setButton] = useState("Submit")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [dataCount, setDataCount] = useState(0)
  const [pageCount, setPageCount] = useState(10)
  const [currentpage, setCurrentPage] = useState(1)

  const history = useHistory()
  const [type, setType] = useState("")
  let pagesize = 10

  useEffect(async () => {
    setRefresh(false)
    let typ = window.location.pathname.split("/").pop()
    if (typ !== "new") {
      let res = await getAttribute({ attribute_id: typ })
      let res1 = await getAttributeValue({
        page: currentpage,
        pagesize: pagesize,
        attribute_id: typ,
      })
      setAttribute(res.data.attribute_name)
      setAttributeValueList(res1.data)
      setDataCount(res.count)
      let pageCount1 = Math.ceil(res.count / pagesize)
      setPageCount(pageCount1)
      setButton("Submit")
    }
    setType(typ)
  }, [props.success, refresh])

  const onPageSubmit = value => {
    setCurrentPage(value.selected + 1)
    console.log("value", value.selected + 1)
  }

  const deleteAttribute = async value => {
    let res = await updateAttributeValue({
      attribute_val_id: value,
      is_delete: true,
    })
    if (res.status == 1) {
      setRefresh(true)

      setSuccess(res.message)
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    } else {
      setError(res.message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    console.log(res)
  }

  async function handleValidSubmit(event, values) {
    if (type !== "new") {
      setAttributeValue(values.attribute_value)
      let res = await addAttributeValue({
        attribute_value: values.attribute_value,
        attribute_id: type,
      })
      if (res.status == 1) {
        setSuccess(res.message)

        setTimeout(() => {
          setSuccess(null)
          //   history.push(`/attribute-values/${type}`)
        }, 3000)
        setRefresh(true)
        setAttributeValue("")
      } else {
        setError(res.message)
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    } else {
      setAttributeValue(values.attribute_value)
      let res = await addAttribute({
        attribute_value: values.attribute_value,
        attribute_id: typ,
      })
      if (res.status == 1) {
        setSuccess(res.message)

        setTimeout(() => {
          setSuccess(null)
          history.push("/attributes")

          setAttribute("")
        }, 3000)
      } else {
        setError(res.message)
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
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
      <div style={{ width: "55%", display: "inline-block" }}>
        <h4 className="card-title mb-4">Attribute Values</h4>

        <Card>
          <CardBody>
            <h6>{attribute}</h6>
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Attribute Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attributeValueList?.map((ele, index) => {
                    //   console.log("ele", ele)
                    return (
                      <tr key={ele._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{ele.attribute_value}</td>

                        <div>
                          <Link
                            to={`/attribute-value/${ele._id}`}
                            className="pe-3"
                          >
                            <AiFillEdit size={20} />
                          </Link>

                          <Link>
                            <AiOutlineDelete
                              size={20}
                              onClick={e => {
                                deleteAttribute(ele._id)
                              }}
                            />
                          </Link>
                        </div>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <br />
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={onPageSubmit}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}

                //   renderOnZeroPageCount={null}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div style={{ width: "40%", float: "right" }}>
        <h4 className="card-title mb-4">Add Attribute Value</h4>

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
                  name="attribute"
                  label="Attribute Name"
                  value={attribute}
                  className="form-control"
                  placeholder="Enter Attribute"
                  type="text"
                  disabled
                />
                <br />
                <AvField
                  name="attribute_value"
                  label="Attribute Value"
                  value={attributeValue}
                  className="form-control"
                  placeholder="Enter Attribute Value"
                  type="text"
                  required
                />
                <br />
              </div>
              <div className="text-center mt-4">
                <Button type="submit" color="primary">
                  {button}
                </Button>
              </div>
            </AvForm>
          </CardBody>
        </Card>
      </div>
      <div style={{ display: "flex" }}></div>
    </React.Fragment>
  )
}

export default AttributeValue
