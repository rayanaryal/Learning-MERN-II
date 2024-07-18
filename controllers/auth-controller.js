const User = require("../models/user-model")
const bcrypt =require("bcryptjs")

const home = async (req, res) =>{
    try{
        res
        .status(200)
        .send(" We are learning MERN STACK. Lets master it 🔥🔥🔥#server.js followed by router and now to controller. Well done, on your improvement");
    } catch (error){
        console.log(error)
    }
}

const register = async(req, res)=>{
    try {
        const {username, email, phone, password } = req.body;
        console.log(req.body)
        const userExist= await User.findOne({email});

        if(userExist){
            return res.status(400).json({msg:"email already exist"})
        }
        // Hash the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

       const userCreated =  await User.create({
        username,
        email, 
        phone, 
        password
     });

        res.status(201).json({ 
            user:"Registeration successfull", 
            token:await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.error(error)
       res.status(500).json("internal server error");
    }
};

// lets work on login

const login = async (req, res) => {
    try {

        const {email, password } = req.body;

        //email validation while login
        const userExist = await User.findOne({email});
        console.log(userExist); // eventhough we serached for email it will give all the document
       

            if(!userExist){
                return res.status(400).json({message:"Invalid credentials.Mate you dont have account yet"});
            }

            const user = await bcrypt.compare(password, userExist.password);
            if (user) {
                res.status(200).json({
                    msg:"Login Successful",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString(),
                });
                
            } else {
                res.status(401).json({message:"Invalid password / email :Mate invalid password"});
                
            };
            
    } catch (error) {
        res.status(500).json("internal server error");
    };
};

module.exports= {home, register, login} 