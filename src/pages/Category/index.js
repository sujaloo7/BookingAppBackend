import React, { useState, useEffect } from "react"
import axios from "axios"

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"


function CategoryPage() {

  // const [data, setData] = useState('');
  // useEffect(() => {
  //   axios({baseURL: 'https://api.spotsaas.com/category/home-page', method: 'GET'}).then(response => {
  //     console.log(response);
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }, [])
  const [data, setData] = useState('');
   useEffect(() => {
    fetch("https://api.spotsaas.com/category")
     .then((response) => response.json())
     .then((response) => setData(response))
     .catch((err) => {
      console.log(err.message);
     });
   }, []);   

  return (
    <>
      <CardBody>
        <CardTitle className="h4">Category Name </CardTitle>


        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              id="tech-companies-1"
              className="table table-striped table-bordered"
            >
              <Thead>
                <Tr>
                  <Th>S.No.</Th>
                  <Th data-priority="1">name</Th>

                </Tr>
              </Thead>
              <Tbody>
                
               
                { data ?
                data.map((element,index) => {
                  return (

                    <>
                    

                      <Tr key={element._id} >
                        <Td>{index+1}</Td>
                        <Td>{element.name}</Td>
                        
                      </Tr>
                    </>
                  )
                }):""}



              </Tbody>
            </Table>
          </div>
        </div>
      </CardBody>
    </>
  )
}


export default CategoryPage;