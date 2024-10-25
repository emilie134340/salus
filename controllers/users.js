const mongodb = require('../database/index');
const ObjectId = require('mongodb').ObjectId;

// get all of the contacts
const getAllUsers = async (req, res, next) => {
    const result = await mongodb.getDb().db('cse341-db').collection('users').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };


// get just one user from their ID
const getUser = async (req, res, next) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDb().db('cse341-db').collection('users').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

module.exports = { getAllUsers, getUser }