import express from "express";
import * as dotevnv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/user.js";
import vars from "./utils/vars.js";

dotevnv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`);
}

const PORT = process.env.PORT;
const SERVER_ADRESS = process.env.SERVER_ADRESS;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", routes);

app.all("*", (req, res) => {
  vars.setResponse(
    res,
    vars.status.NOT_FOUND.message,
    vars.status.NOT_FOUND.code
  );
});

app.listen(PORT, () => {
  console.log(`Server ON http://${SERVER_ADRESS}:${PORT}`);
});
