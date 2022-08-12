import React from "react"
import { useState, useEffect } from "react"
import { Table, Button, Row, Col } from "reactstrap"
import { getUserList, changeUserStatus } from "repositories/adminRepository"
import ReactPaginate from "react-paginate"
import { UncontrolledAlert } from "reactstrap"

export default function BlockedOwnerList() {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [userList, setUserList] = useState([])
    const [dataCount, setDataCount] = useState(0)
    const [pageCount, setPageCount] = useState(10)
    const [currentpage, setCurrentPage] = useState(1)
    const [refresh, setRefresh] = useState(false)
    let pagesize = 10
    useEffect(() => {
        setRefresh(false)
        UserList()
    }, [currentpage, refresh])

    const UserList = async () => {
        let res = await getUserList({
            is_owner: true,
            page: currentpage,
            pagesize: pagesize,
            is_block: true,
        })
        console.log(res)
        setUserList(res.data)
        setDataCount(res.count)
        let pageCount1 = Math.ceil(res.count / pagesize)
        setPageCount(pageCount1)
        let a = res.data
        console.log("api data", a)
    }

    const onPageSubmit = value => {
        setCurrentPage(value.selected + 1)
        console.log("value", value.selected + 1)
    }

    const unBlock = async value => {
        let res = await changeUserStatus({ user_id: value, is_block: "false" })
        if (res.status == 1) {
            setRefresh(true)
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
        console.log(res)
    }
    const deleteUser = async value => {
        let res = await changeUserStatus({ user_id: value })
        if (res.status == 1) {
            setRefresh(true)
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
        console.log(res)
    }
    return (
        <>
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
            <div className="table-responsive">
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mobile</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((ele, index) => {
                            //   console.log("ele", ele)
                            return (
                                <tr key={ele._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{ele.mobile}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.email}</td>
                                    <div>
                                        <Button
                                            color="secondary"
                                            onClick={event => unBlock(ele._id)}
                                        >
                                            UnBlock
                                        </Button>{" "}
                                        <Button
                                            color="primary"
                                            onClick={event => deleteUser(ele._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <div style={{ display: "inline-block" }}>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={onPageSubmit}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}

                //   renderOnZeroPageCount={null}
                />
            </div>
        </>
    )
}
