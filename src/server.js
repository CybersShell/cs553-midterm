import express from "express";
import { StartTasksController } from "./routes/tasks.ts";

const handleServerErrors = (err, req, res, next) =>{
            if(err){
                if (err instanceof SyntaxError){

                    if(/JSON/i.test(err.message)){

                        res.status(400).json({ error: "Bad JSON format"})

                    } else{
                        res.status(500).json(err.message)
                    }
                    
                    console.log(err.message)
                    
                }
                // res.status(500).json(err.message)
                next(err);
          }
}

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.on('finish', () => {
      console.log({"method": req.method, path: req.path , time: Date.now(), "status": res.statusCode})
    });
    next();
})

  // Starter data. This data is stored in memory and will reset when the
  // server restarts.
let nextId = 3;
const tasks = [
    { id: 1, title: "Get API started", course: "CS553", completed: true },
    { id: 2, title: "Complete API", course: "CS553", completed: false },
];


app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

await StartTasksController(app, tasks, nextId)

app.use(handleServerErrors)
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});





const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

if (isMainModule) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Midterm REST API listening on port ${PORT}`);
  });
}
