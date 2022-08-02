import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import { addState, updateState, getState } from "repositories/locationRepository"
import { useHistory } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const AddState = props => {
  const [state, setState] = useState("")
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
      let res = await getState({ state_id: typ })
      setState(res.data.state_name)
      setButton("Update")
    }
    setType(typ)
  }, [props.success, state])

  async function handleValidSubmit(event, values) {
    console.log("state", values.state)
    if (type !== "new") {
      setState(values.state)
      console.log("edit")
      let res = await updateState({
        state_name: values.state,
        state_id: type,
      })
      if (res.status == 1) {
        setSuccess(res.message)

        setTimeout(() => {
          setSuccess(null)
          setState("")
          history.push("/states")
        }, 3000)
      } else {


        setError(res.message)
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    } else {

      setState(values.state)
      let res = await addState({
        state_name: values.state
      })
      console.log("add wala", res)
      if (res.status == 1) {
        setSuccess(res.message)

        setTimeout(() => {
          setSuccess(null)
          setState("")
          history.push("/states")
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

      <h4 className="card-title mb-4">Add State</h4>

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
                name="state"
                label="State Name"
                value={state}
                className="form-control"
                placeholder="Enter State"
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

export default AddState
