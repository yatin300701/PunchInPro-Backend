import cors, { CorsOptions } from "cors";
import express, { NextFunction, Request, Response } from "express";
import { createConnections } from "./connection";
import employeeRoute from "./routes/employess"

const app = express();

var corsOptions: CorsOptions = {
    origin: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  };
  
  app.use(cors(corsOptions));

  app.get("/api", async (req: Request, res: Response, next: NextFunction) => {
    return res.json({ message: `working... ${new Date()}` });
  });

  app.use("/api/employee",employeeRoute);



function main() {
    createConnections()
      .then((_) => {
        console.log("connected")
        app.listen(3000, () => {
        //   logger.info();
        console.log("at ", 300)
        });
      })
      .catch((error) => {
        // logger.fatal(error);
      });
  }
  
  main();