import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import './Employee.css';


export default function Student() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' }
    const [empName, setName] = useState('')
    const [empEmail, setEmail] = useState('')
    const [empDepId, setDepId] = useState('')
    const [empSalary, setSalary] = useState('')
    const [empAddress, setAddress] = useState('')
    const [changeUpdatebtn,setChangeUpdatebtn] = useState("");
    const [employee, setemployee] = useState([])
    const [error, setError] = useState(null);
    const[empId, setEmpId]= useState(null);
    const handleClick = (e) => {
        e.preventDefault()
        const employee = { empName,empEmail, empDepId,empSalary,empAddress }
        console.log(employee)
        const updateURL = "http://127.0.0.1:8080/onedata_employee/update_emp/";
        if(changeUpdatebtn === "update"){
            fetch(updateURL + parseInt(empId), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employee)
            }).then(response => response.json())
            .then(data =>{
                console.log(data)
            });

        }
        if(changeUpdatebtn !== "update"){
            fetch("http://127.0.0.1:8080/onedata_employee/emp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employee)
            }).then(response => response.json())
            .then(data =>{
                console.log(data)
            });
            window.location.reload();
        }



    }


    useEffect(() => {
        fetch("http://127.0.0.1:8080/onedata_employee/get_all_emp")
            .then(res => res.json())
            .then((result) => {
                setemployee(result);
            }
            )
    }, [])

    const handleUpdate=(id)=>{
        employee.map((val)=>{
            if(val.empId === id){
                setEmpId(val.empId)
                setName(val.empName);
                setEmail(val.empEmail);
                setDepId(val.empDepId);
                setSalary(val.empSalary);
                setAddress(val.empAddress);
            }
        })
        setChangeUpdatebtn("update");

    }

    return (
        <>
            <Container>
                {/* <h1 style={{ color: '	dodgerblue', textAlign: 'center' }}>Employee Form</h1> */}
                <Paper elevation={3} style={paperStyle}>

                    <Box
                        className='employee__info'
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField id="outlined-basic" className='employee__infoInput' label="Name" variant="outlined"
                            value={empName}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField id="outlined-basic" className='employee__infoInput' label="Email" variant="outlined"
                            value={empEmail}
                            onChange={(e) => setEmail(e.target.value)} />

                        <TextField id="outlined-basic" className='employee__infoInput' label="Phone" variant="outlined" value={empDepId}
                            onChange={(e) => setDepId(e.target.value)}/>
                        <TextField id="outlined-basic" className='employee__infoInput' label="City" variant="outlined" value={empSalary}
                            onChange={(e) => setSalary(e.target.value)}/>
                        <TextField id="outlined-basic" className='employee__infoInput' label="DOB" variant="outlined"
                            value={empAddress}
                            onChange={(e) => setAddress(e.target.value)} />

                        <Button  type= "submit" variant="contained" className='employee__infoButton' sx={{width:"0vw"}}  style={{ color:"white",background:"lightgray",width:"0vw !important",marginLeft: "25rem"}} onClick={handleClick }>
                           {changeUpdatebtn === "update" ? "UPDATE": "SUBMIT"}
                        </Button>
                    </Box>

                </Paper>


            </Container>

        {employee.reduce((rows, employee, index) => {
        if (index % 4 === 0) rows.push([]);
        rows[rows.length - 1].push(employee);
        return rows; 
        }, []).map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
            <Paper elevation={3} style={paperStyle} className='employee__display'>

            {row.map(employee => (
                <Paper
                className='employee__displayPaper'
                elevation={3}
                style={{ margin: "10px", padding: '15px', textAlign: 'left', width: 'calc(25% - 20px)' }}
                key={employee.empId}
                >
                <div className='employee__displayFirstLine'>
                    <div>Employee Id : {employee.empId}</div>
                    <div><i className='employee__displayicon' ><EditNoteIcon onClick={()=>handleUpdate(employee.empId)} /></i> <button><i className='employee__displayicon' onClick=""><DeleteIcon /></i></button>
                    {error && <p>{error}</p>}</div>
                </div>
                <div>Name : {employee.empName}</div>
                <div>Email : {employee.empEmail}</div>
                <p>City : {employee.empDepId}</p>
                <p>Phone : {employee.empSalary}</p>
                <p>BOD: {employee.empAddress}</p>
                </Paper>
            ))}
            </Paper>
            {(rowIndex + 1) % 2 === 0 && <div style={{ pageBreakAfter: 'always' }} />}
        </React.Fragment>
        ))}

        </>

    );
}
