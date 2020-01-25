const router = require('express').Router();
const bodyParser = require("body-parser");
const tests = require("../db/models/test.js");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async (req, res, next) => {
    try{
        res.send(await tests.findAll())
    }
    catch(error){
        next(error)
    }
})
router.get("/:id", async (req, res, next)=> {
    try {
        let searchId = req.params["id"];
        let foundTest = await tests.findOne({ where: { id: searchId } });
        if (foundTest) res.send(foundTest);
        else {
          res.sendStatus(404);
        }
      } catch (error) {
        next(error);
      }
})

router.post("/student/:studentId", async(req, res, next) => {
   let newTest =  await tests.create(req.body, {studentId: req.params.studentId})
   newTest.studentId = Number(req.params.studentId)
    await newTest.save()
    res.status(201).send(newTest)
    
})

router.delete("/:id", async (req, res, next) =>{
    try{
        let searchId = req.params.id
        let foundTest = await tests.findOne({ where: { id: searchId } });
        await foundTest.destroy()
        res.sendStatus(204)
    }
    catch(error){
        next(error)
    }
})
module.exports = router;
