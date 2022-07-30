import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import { addSize, updateSize, getSize } from "repositories/productRepository"
import { useHistory } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const AddSize = props => {
  const [size, setSize] = useState("")
  const [adminId, setAdminId] = useState("")
  const [sizeId, setSizeId] = useState("")
  const [button, setButton] = useState("Submit")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const history = useHistory()
  const [type, setType] = useState("")

  useEffect(async () => {
    let typ = window.location.pathname.split("/").pop()
    if (typ !== "new") {
      let res = await getSize({ size_id: typ })
      setSize(res.data.size)
      setButton("Update")
    }
    setType(typ)
  }, [props.success, size])

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
      setSize(values.size)
      let res = await addSize({
        size: values.size,
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

      <h4 className="card-title mb-4">Add Size</h4>

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
                name="size"
                label="Size"
                value={size}
                className="form-control"
                placeholder="Enter Size"
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
    </React.Fragment>
  )
}

export default AddSize
