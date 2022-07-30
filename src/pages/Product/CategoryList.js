import React from "react"
import { useState, useEffect } from "react"
import { Table, Button, Row, Col } from "reactstrap"
import { getCategory, updateCategory } from "repositories/productRepository"
import ReactPaginate from "react-paginate"
import { UncontrolledAlert } from "reactstrap"
import { useHistory } from "react-router-dom"
import { AiFillEdit } from "react-icons/ai"
import { AiOutlineDelete } from "react-icons/ai"
import { Link } from "react-router-dom"
import { imageUrl } from "repositories/Repository"

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [dataCount, setDataCount] = useState(0)
  const [pageCount, setPageCount] = useState(10)
  const [currentpage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const history = useHistory()

  let pagesize = 10
  useEffect(() => {
    CategoryList()
    setRefresh(false)
  }, [currentpage, refresh])

  const CategoryList = async () => {
    let res = await getCategory({
      page: currentpage,
      pagesize: pagesize,
    })

    setCategoryList(res.data)
    setDataCount(res.count)
    let pageCount1 = Math.ceil(res.count / pagesize)
    setPageCount(pageCount1)
  }

  const blockuser = async value => {
    let res = await changeUserStatus({ user_id: value, is_block: "true" })
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
    console.log("row data", res)
    // let res = await changeUserStatus({})
  }
  const onPageSubmit = value => {
    setCurrentPage(value.selected + 1)
    console.log("value", value.selected + 1)
  }

  const deleteCategory = async value => {
    let res = await updateCategory({ category_id: value, is_delete: true })
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
          <Link to={"/add-category/new"}>
            <Button style={{ float: "right" }}>Add Category</Button>
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
              <th>Category Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.map((ele, index) => {
              //   console.log("ele", ele)
              return (
                <tr key={ele._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{ele.name}</td>
                  <td>
                    {" "}
                    <img
                      src={`${imageUrl}${ele.image_name}`}
                      height={60}
                      width={60}
                    />
                  </td>

                  <div>
                    <Link to={`/add-category/${ele._id}`} className="pe-3">
                      <AiFillEdit size={20} />
                    </Link>

                    <Link>
                      <AiOutlineDelete
                        size={20}
                        onClick={e => {
                          deleteCategory(ele._id)
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
