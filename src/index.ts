import express, {Application, Request, Response} from "express" ;
import dotenv from "dotenv";
import routes from "./routes/routes";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app: Application = express();

const allowedOrigins = ['http://localhost:4200', 'http://192.168.1.9:4200'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(express.json());
app.use(cors(options));
app.use("/expenses", routes);

const mongo = mongoose;

// MongoDB Connection
mongo.connect('mongodb://localhost:27017/expenses')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('connection error:', err));


const db = mongo.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log("Server is running on port  --", PORT);
});