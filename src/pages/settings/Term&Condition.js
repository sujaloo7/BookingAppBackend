import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import {
  getTermAndCondition,
  updateTermAndCondition,
} from "repositories/settingRepository"
import { useHistory } from "react-router-dom"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const TermAndCondition = props => {
  const [term, setTerm] = useState("")
  const [termId, setTermId] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const history = useHistory()

  useEffect(async () => {
    GetTermAndCondition()
  }, [props.success])

  const GetTermAndCondition = async () => {
    let res = await getTermAndCondition()
    setTerm(res.data.term_and_condition)
    setTermId(res.data._id)
  }

  async function handleValidSubmit(event, values) {
    let res = await updateTermAndCondition({
      term_and_condition: term,
      termandcondition_id: termId,
    })
    if (res.status == 1) {
      setSuccess(res.message)

      setTimeout(() => {
        setSuccess(null)
        history.push("/terms")
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

      <h4 className="card-title mb-4">Term And Condition</h4>

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
                data={term}
                config={{ placeholder: "enter term and condition ..." }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setTerm(data)
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

export default TermAndCondition
