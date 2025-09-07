import express from 'express'
import cors from 'cors'
 import { getHealth } from './controller/student.js';
const app = express();
//app.options("*", cors());

app.use(cors());
app.use(express.json())
const PORT = 5001;
let STUDENTS = [];
//lecture no:1 Introduction to Backend 
app.get("/ping", (req, res) => {
    res.send('pong');
})
//lecture no:2 Nodemon API and Postman
//First API Endpoint
app.get("/home", (req, res) => {
    res.json({ message: ' Home page' })
})
//Second API Endpoints
app.get('/about', (req, res) => {
    res.json({ message: 'This is a about page' })
})
//Third API Endpoint Student that using postman tool

// app.get("/students",(req,res)=>{
//     res.json({
//         student:['krushna','Pratik',"raj"]
//     })
// })

//Sending data to the API and Interacting with API lecture no:117


app.get("/students", (req, res) => {
  res.json({
    success: true,
    data: STUDENTS,
    message: "Students fetched successfully"
  });
});

//API always write in pluarls format because number of times you call API you can created a new resource every time so that's why API alway writes in pluarls format 
app.post("/students", (req, res) => {
    // console.log(req.body);
    // const name=req.body.name;
    // const city=req.body.city;
    // const id=req.body.id;

    //destructring 
    const { id, name, city } = req.body

    for (const stud of STUDENTS) {
        if (id === stud.id) {
            return res.json({
                success: false,
                message: "Id already Exists"
            })
        }
    }
    if (!name) {
        return res.json({
            success: false,
            message: "Name is required"
        });
    }

    if (!city) {
        return res.json({
            success: false,
            message: "City is required"
        });
    }

    if (!id) {
        return res.json({
            success: false,
            message: "ID is required"
        });
    }

    const studentsObj = {
        // "id":id,
        // "name":name,
        // "city":city,
        id,
        name,
        city,
    }

    STUDENTS.push(studentsObj);
    res.json({
        success: true,
        data: studentsObj,
        message: 'student Created successfully'
    })
})

//Deleting recored using API

app.delete("/studentsd/:id", (req, res) => {

    const id = req.params.id;
    let studentIndex = -1;

    STUDENTS.forEach((stud, i) => {
      if (stud.id.toString() === id.toString())  {
            studentIndex = i
        }
    })
    if (studentIndex === -1) {
        return res.json({
            success: false,
            message: "Studnet are not found "
        })
    }
    else {
        STUDENTS.splice(studentIndex, 1)
        return res.json({
            success: true,
            data: STUDENTS,
            message: "Student deleted successfully"
        })
    }
})

//Put and patch API lecture no:118
app.put("/studentsp/:id", (req, res) => {
    // console.log(req.body);
    const { id } = req.params;
    const { name, city } = req.body;
    if (!name) {
        return res.json({
            success: false,
            message: "Name is required"
        });
    }

    if (!city) {
        return res.json({
            success: false,
            message: "City is required"
        });
    }

    let studentIndex = -1;

    STUDENTS.forEach((stud, i) => {
        if (stud.id === id) {
            studentIndex = i
        }
    })

    if (studentIndex == -1) {
        return res.json({
            success: false,
            message: "ID are not found"
        })
    }

    STUDENTS[studentIndex] = {
        id: parseInt(id),
        name: name,
        city: city
    }

    return res.json({
        success: true,
        data: STUDENTS[studentIndex],
        message: `student with ${id} is updated  successfully`
    })
})

app.patch("/studentspatch/city/:id", (req, res) => {
    const { id } = req.params;
    const { city } = req.body;
    if (!city) {
        return res.json({
            success: false,
            message: "City is required"
        });
    }

        let studentIndex = -1;

        STUDENTS.forEach((stud, i) => {
            if (stud.id === id) {
                studentIndex = i
            }
        })

        if (studentIndex == -1) {
            return res.json({
                success: false,
                message: "student are not found"
            })
        }
    

 const ExistingStudent=STUDENTS[studentIndex];
 const updateStudent={
    ...ExistingStudent,city

 }
 STUDENTS[studentIndex]=updateStudent;
 res.json({
    success:true,
    data:updateStudent,
    message:`student ${id} update successfully`
 })
})

//Query parameter
app.get("/students/search",(req,res)=>{
    console.log(req.query);
    res.json({
        success:true,
        data:STUDENTS,
        message:"Students Fetched successfully"
    })

})

 app.get("/health",getHealth);
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})