import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import { Row, Col, Card, Alert, CardBody, Media, Button } from "reactstrap"
import { UncontrolledAlert } from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import avatar from "../../assets/images/users/user-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import {
  getAdminProfile,
  updateAdminProfile,
} from "repositories/adminRepository"

const UserProfile = props => {
  const [email, setemail] = useState("")
  const [name, setName] = useState("")
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [username, setUserName] = useState("")
  const [adminId, setAdminId] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    profile()
  }, [props.success, fname, lname])

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Profile", link: "#" },
  ]

  useEffect(() => {
    console.log("props", props)
    props.setBreadcrumbItems("Profile", breadcrumbItems)
  }, [])

  const profile = async () => {
    let res = await getAdminProfile()
    let first = res.data.fname
    console.log(first)
    let last = res.data.lname
    let fullName = first + " " + last
    setName(fullName)
    setUserName(res.data.username)
    setAdminId(res.data._id)
    setFName(res.data.fname)
    setLName(res.data.lname)
    console.log("hiii", res.data)
  }

  const updateProfile = async () => {
    let res = await updateAdminProfile()
    setName(fullName)
    setUserName(res.data.username)
    setAdminId(res.data._id)
    console.log("hiii", res.data)
  }

  async function handleValidSubmit(event, values) {
    setFName(values.firstname)
    setLName(values.lastname)
    let res = await updateAdminProfile({
      admin_id: adminId,
      fname: values.firstname,
      lname: values.lastname,
    })
    if (res.status == 1) {
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

          <Card>
            <CardBody>
              <Media>
                <div className="ms-3">
                  <img
                    src={avatar}
                    alt=""
                    className="avatar-md rounded-circle img-thumbnail"
                  />
                </div>
                <Media body className="align-self-center">
                  <div className="text-muted">
                    <h5>{name}</h5>
                    <p className="mb-1">{email}</p>
                    <p className="mb-0">Username : {username}</p>
                  </div>
                </Media>
              </Media>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <h4 className="card-title mb-4">Update Profile</h4>

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
                name="firstname"
                label="First Name"
                value={fname}
                className="form-control"
                placeholder="Enter First Name"
                type="text"
                required
              />
              <br />
              <AvField
                name="lastname"
                label="last Name"
                value={lname}
                className="form-control"
                placeholder="Enter Last Name"
                type="text"
                required
              />
            </div>
            <div className="text-center mt-4">
              <Button type="submit" color="primary">
                Update Profile
              </Button>
            </div>
          </AvForm>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {
    editProfile,
    resetProfileFlag,
    setBreadcrumbItems,
  })(UserProfile)
)
