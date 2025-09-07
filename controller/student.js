//temporary data store means when server load data of this array is vanish 
const STUDENTS = [
    {
        id: "1",
        name: "Pratik",
        city: "Nagar"
    },
    {
        id: "2",
        name: "Krushna",
        city: "Nagar"
    }
]

//create API controller
const getStudent= (req, res) => {
    //change the API status code
    res.status(201).json({
        success: true,
        data: STUDENTS,
        message: "Data Fetched successfully "
    })
}

const getHealth=(req,res)=>{
    res.json({
        success:true,
        message:"Server is running"
    })

   
}
export{
    getHealth,getStudent
}