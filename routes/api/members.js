const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//api call
router.get('/', (req, res) => {
  console.log('inside api');
  res.json(members);
});
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const output = members.filter((obj) => obj.id === parseInt(req.params.id));
    res.json(output);
  } else {
    res.status(400).json({ msg: `No member with id: ${req.params.id}` });
  }
});

//create member
router.post('/', (req, res) => {
  const member = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age
  };
  if (!req.body.name || !req.body.age) {
    res.status(404).json({ msg: `Please enter name and age` });
  } else {
    members.push(member);
    res.send(members);
  }
});

//update member
router.put('/:id', (req, res) => {
  if (!req.body.name || !req.body.age) {
    res.status(404).json({ msg: `Please enter name and age` });
  } else {
    const found = members.some(
      (member) => member.id === parseInt(req.params.id)
    );
    if (found) {
      const newMember = req.body;
      members.forEach((member) => {
        if (member.id === parseInt(req.params.id)) {
          member.name = newMember.name;
          member.age = parseInt(newMember.age);
        }
      });
      res.send(members);
    } else {
      res.status(400).json({ msg: `No member with id: ${req.params.id}` });
    }
  }
});

//delete member
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const output = members.filter((obj) => obj.id !== parseInt(req.params.id));
    res.json(output);
  } else {
    res.status(400).json({ msg: `No member with id: ${req.params.id}` });
  }
});

module.exports = router;
