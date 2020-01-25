const router = require("express").Router();
const bodyParser = require("body-parser");
const students = require("../db/models/student.js");

router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async (req, res, next) => {
  try {
    res.send(await students.findAll());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let searchId = req.params["id"];
    let foundStudent = await students.findOne({ where: { id: searchId } });
    if (foundStudent) res.send(foundStudent);
    else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  let newStudent = await students.create(req.body);
  res.status(201).send(newStudent);
});

router.put("/:id", async (req, res, next) => {
  try{
    let searchId = req.params["id"];
    let foundStudent = await students.findOne({ where: { id: searchId } });
    let attToUpdate = Object.keys(req.body);
    foundStudent[attToUpdate] = req.body[attToUpdate];
    await foundStudent.save();
    res.send(foundStudent);
  }
  catch(error){
    next(error)
  }
});

router.delete("/:id", async (req, res, next) => {
  try{
    let searchId = req.params.id;
    let foundStudent = await students.findOne({ where: { id: searchId } });
    await foundStudent.destroy()
    res.sendStatus(204)
  }
  catch(error){
    next(error)
  }
});

module.exports = router;
