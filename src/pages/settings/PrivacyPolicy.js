import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import {
  getPrivacyPolicy,
  updatePrivacyPolicy,
} from "repositories/settingRepository"
import { useHistory } from "react-router-dom"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const PrivacyPolicy = props => {
  const [privacy, setPrivacy] = useState("")
  const [privacyId, setPrivacyId] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const history = useHistory()

  useEffect(async () => {
    GetPrivacyPolicy()
  }, [props.success])

  const GetPrivacyPolicy = async () => {
    let res = await getPrivacyPolicy()
    setPrivacy(res.data.privacy_policy)
    setPrivacyId(res.data._id)
  }

  async function handleValidSubmit(event, values) {
    let res = await updatePrivacyPolicy({
      privacy_policy: privacy,
      privacypolicy_id: privacyId,
    })
    if (res.status == 1) {
      setSuccess(res.message)

      setTimeout(() => {
        setSuccess(null)
        history.push("/privacy")
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

      <h4 className="card-title mb-4">Privacy Policy</h4>

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
                data={privacy}
                config={{ placeholder: "enter privacy policy ..." }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setPrivacy(data)
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

export default PrivacyPolicy
