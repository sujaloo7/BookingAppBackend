import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"
import { addFaq, updateFaq, getFaq } from "repositories/settingRepository"
import { useHistory } from "react-router-dom"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import { set } from "lodash"

const AddFaq = props => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
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
      let res = await getFaq({ faq_id: typ })
      setQuestion(res.data.question)
      setAnswer(res.data.answer)
      setButton("Update")
    }
    setType(typ)
  }, [props.success])

  async function handleValidSubmit(event, values) {
    if (type !== "new") {
      setQuestion(values.question)
      let res = await updateFaq({
        question: values.question,
        answer: answer,
        faq_id: type,
      })
      if (res.status == 1) {
        setSuccess(res.message)

        setTimeout(() => {
          setSuccess(null)
          setQuestion("")
          setAnswer("")
          history.push("/faqlist")
        }, 3000)
      } else {
        setError(res.message)
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    } else {
      setQuestion(values.question)
      let res = await addFaq({
        question: values.question,
        answer: answer,
      })
      if (res.status == 1) {
        setSuccess(res.message)

        setTimeout(() => {
          setSuccess(null)
          setQuestion("")
          setAnswer("")
          history.push("/faq")
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

      <h4 className="card-title mb-4">Add FAQ</h4>

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
                name="question"
                label="Question"
                value={question}
                className="form-control"
                placeholder="Enter Size"
                type="text"
                required
              />

              <br />

              <CKEditor
                editor={ClassicEditor}
                data={answer}
                config={{ placeholder: "insert answer here..." }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setAnswer(data)
                }}
              />
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

export default AddFaq
