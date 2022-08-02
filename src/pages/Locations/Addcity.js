import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import { addCity, updateCity, getCity } from "repositories/locationRepository"
import { useHistory } from "react-router-dom"
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const AddCity = props => {
    const [city, setCity] = useState("")
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
            let res = await getCity({ city_id: typ })
            setCity(res.data.city_name)
            setButton("Update")
        }
        setType(typ)
    }, [props.success, city])

    async function handleValidSubmit(event, values) {
        console.log("state", values.state)
        if (type !== "new") {
            setCity(values.state)
            console.log("edit")
            let res = await updateCity({
                city_name: values.state,
                city_id: type,
            })
            if (res.status == 1) {
                setSuccess(res.message)
                setTimeout(() => {
                    setSuccess(null)
                    setCity("")
                    history.push("/city")
                }, 3000)
            } else {


                setError(res.message)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        } else {

            setCity(values.state)
            let res = await addCity({
                city_name: values.state
            })
            console.log("add wala", res)
            if (res.status == 1) {
                setSuccess(res.message)

                setTimeout(() => {
                    setSuccess(null)
                    setCity("")
                    history.push("/city")
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

            <h4 className="card-title mb-4">Add city</h4>

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
                                label="City Name"
                                value={city}
                                className="form-control"
                                placeholder="Enter City"
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

export default AddCity
