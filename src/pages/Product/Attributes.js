import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import {
  addAttribute,
  updateAttribute,
  getAttribute,
} from "repositories/productRepository"
import { useHistory } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const Attributes = props => {
  const [attribute, setAttribute] = useState("")
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
      let res = await getAttribute({ attribute_id: typ })
      setAttribute(res.data.attribute_name)
      setButton("Update")
    }
    setType(typ)
  }, [props.success, attribute])

  async function handleValidSubmit(event, values) {
    if (type !== "new") {
      setAttribute(values.attribute)
      let res = await updateAttribute({
        attribute_name: values.attribute,
        attribute_id: type,
      })
      if (res.status == 1) {
        setSuccess(res.message)

        setTimeout(() => {
          setSuccess(null)
          setAttribute("")
          history.push("/attributes")
        }, 3000)
      } else {
        setError(res.message)
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    } else {
      setAttribute(values.attribute)
      let res = await addAttribute({
        attribute_name: values.attribute,
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

      <h4 className="card-title mb-4">Add Attribute</h4>

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

export default Attributes
