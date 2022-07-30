import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import {
  getAttributeValue,
  updateAttributeValue,
} from "repositories/productRepository"
import { useHistory } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const EditAttributeValue = props => {
  const [attributeValue, setAttributeValue] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const history = useHistory()
  const [type, setType] = useState("")

  useEffect(async () => {
    let typ = window.location.pathname.split("/").pop()

    let res = await getAttributeValue({ attribute_val_id: typ })
    setAttributeValue(res.data.attribute_value)
    setType(typ)
  }, [props.success, attributeValue])

  async function handleValidSubmit(event, values) {
    setAttributeValue(values.attribute_value)
    let res = await updateAttributeValue({
      attribute_value: values.attribute_value,
      attribute_val_id: type,
    })
    if (res.status == 1) {
      setSuccess(res.message)

      setTimeout(() => {
        setSuccess(null)
        setAttributeValue("")
        history.push("/sizes")
      }, 3000)
    } else {
      setError(res.message)
      setTimeout(() => {
        setError(null)
      }, 5000)
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

      <h4 className="card-title mb-4">Update Attribute Value</h4>

      <Card className="ms-auto me-auto ">
        <CardBody>
          <AvForm
            className="form-horizontal"
            onValidSubmit={(e, v) => {
              handleValidSubmit(e, v)
            }}
          >
            <div className="form-group">
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
                Update
              </Button>
            </div>
          </AvForm>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default EditAttributeValue
