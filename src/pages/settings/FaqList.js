import React from "react"
import { useState, useEffect } from "react"
import { Table, Button, Row, Col } from "reactstrap"
import { getFaq, updateFaq } from "repositories/settingRepository"
import ReactPaginate from "react-paginate"
import { UncontrolledAlert } from "reactstrap"
import { useHistory } from "react-router-dom"
import { AiFillEdit } from "react-icons/ai"
import { AiOutlineDelete } from "react-icons/ai"
import { Link } from "react-router-dom"

export default function FaqList() {
  const [faqList, setFaqList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [dataCount, setDataCount] = useState(0)
  const [pageCount, setPageCount] = useState(10)
  const [currentpage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const history = useHistory()

  let pagesize = 10
  useEffect(() => {
    FaqList()
    setRefresh(false)
  }, [currentpage, refresh])

  const FaqList = async () => {
    let res = await getFaq({
      page: currentpage,
      pagesize: pagesize,
    })

    setFaqList(res.data)
    setDataCount(res.count)
    let pageCount1 = Math.ceil(res.count / pagesize)
    setPageCount(pageCount1)
  }

  const onPageSubmit = value => {
    setCurrentPage(value.selected + 1)
    console.log("value", value.selected + 1)
  }

  const deleteFaq = async value => {
    let res = await updateFaq({ faq_id: value, is_delete: true })
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
          <Link to="/faq/new">
            <Button style={{ float: "right" }}>Add Faq</Button>
          </Link>
        </Col>
      </Row>
      <br />
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
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {faqList?.map((ele, index) => {
              //   console.log("ele", ele)
              return (
                <tr key={ele._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{ele.question}</td>

                  <div>
                    <Link to={`/faq/${ele._id}`} className="pe-3">
                      <AiFillEdit size={20} />
                    </Link>

                    <Link>
                      <AiOutlineDelete
                        size={20}
                        onClick={e => {
                          deleteFaq(ele._id)
                        }}
                      />
                    </Link>
                  </div>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <div style={{ display: "flex" }}>
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
