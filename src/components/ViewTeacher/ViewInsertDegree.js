import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewInsertDegree = () => {
    const initDegree = {
      name_degree: "",
      initials_degree: "",
    };

  const [degree, setDegree] = useState(initDegree);
  const [submited, setSumited] = useState(false);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setDegree({ ...degree, [name]: value });
  };

  const saveDegree = (e) => {
    e.preventDefault()
      var data = {
        name_degree: degree.name_degree,
        initials_degree: degree.initials_degree,
          }
          if (data['name_degree'] === ""|| data['initials_degree'] === "" ){
            Swal.fire(

            'ผิดพลาด',
            'กรุณารอกรอกข้อมูลให้ครบ',
            'error'
        )
    } else {
        axios.post("http://localhost:8080/degree" , data)
      .then((res) => {
                console.log(res.data.message);
                if (res.data.message == "success") {
                    ////ต่อตรงนี้
                    Swal.fire(

                        'เพิ่มข้อมูลวุฒิการศึกษาเรียบร้อย',
                        '',
                        'success'
                    )
                        .then(() => window.location.assign("/degreeall"))

                } else {

                    Swal.fire(
                        'เพิ่มข้อมูลสาขาผิดพลาด',
                        'ชื่อคณะนี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
                        'error'
                    )

                }

            })
            .catch((error) => {
                console.log("error");
            });//ใช้ ดัก Error

    };
}

  return (

    <div class="container">
  
<Form>
          <center><h2>เพิ่มหลักสูตร</h2></center>
  
          <Jumbotron>
            <Label for="name_degree">ชื่อหลักสูตร</Label>
            <Input 
            type="text" 
            name="name_degree" 
            id="name_degree" 
            value={degree.name_degree|| ""}
            onChange={handleInputChange}
            placeholder="ชื่อหลักสูตร"
            />
            <Label for="initials_degree">ชื่อย่อหลักสูตร</Label>
            <Input 
            type="text" 
            name="initials_degree" 
            id="initials_degree" 
            value={degree.initials_degree|| ""}
            onChange={handleInputChange}
            placeholder="ชื่อย่อหลักสูตร"
            />
          </Jumbotron>
          <div>
            <Button className="btn btn-success" onClick={saveDegree}>บันทึก</Button>
          </div>
        </Form>
     
      

    </div>

  );
};


export default ViewInsertDegree;