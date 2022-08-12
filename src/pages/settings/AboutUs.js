import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import { getAboutUs, updateAboutUs } from "repositories/settingRepository"
import { useHistory } from "react-router-dom"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const AboutUs = props => {
  const [about, setAbout] = useState("")
  const [aboutId, setAboutId] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const history = useHistory()

  useEffect(async () => {
    GetAboutUs()
  }, [props.success])

  const GetAboutUs = async () => {
    let res = await getAboutUs()
    setAbout(res.data.about_us)
    setAboutId(res.data._id)
  }

  async function handleValidSubmit(event, values) {
    let res = await updateAboutUs({
      about_us: about,
      aboutus_id: aboutId,
    })
    if (res.status == 1) {
      setSuccess(res.message)

      setTimeout(() => {
        setSuccess(null)
        history.push("/about")
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

      <h4 className="card-title mb-4">About Us</h4>

      <Card>
        <CardBody>
          <AvForm
            className="form-horizontal"
            onValidSubmit={(e, v) => {
              handleValidSubmit(e, v)
            }}
          >
            <div className="form-group">
              <CKEditor
                editor={ClassicEditor}
                data={about}
                config={{ placeholder: "enter about us ..." }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setAbout(data)
                }}
              />
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

export default AboutUs
