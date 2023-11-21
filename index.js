const express = require("express");
// JSON data import
const { users } = require("./data/users.json");
const { books } = require("./data/books.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    });
});

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public 
 * Parameters: None
 */
app.get("/users", (req,res) => {
    res.status(200).send({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by id 
 * Access: Public 
 * Parameters: id
 */
app.get("/users/:id", (req,res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found",
        });
    } 
    return res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * Route: /users
 * Method: POST
 * Description: Create new user  
 * Access: Public 
 * Parameters: none
 */
app.post("/users", (req,res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(501).json({
            success: false,
            message: "User already exist with this id",
        });
    }
    users.push({
        id, 
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });

    return res.status(201).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user data
 * Access: Public 
 * Parameters: id
 */
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user not found to update",
        });
    }

    const updatedUser = users.map((each) => {
        if(each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updatedUser,
    });
});


app.get("*", (req, res) => {
    res.status(400).json ({
        message: "This route does not exist"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});