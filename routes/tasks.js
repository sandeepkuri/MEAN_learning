var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://sandeep:mahla001@ds155424.mlab.com:55424/mytasklist_sandeep', ['tasks']);

//Get all task
router.get('/tasks', function(req, res, next) {
    db.tasks.find(function(err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

//Get single task 
router.get('/tasks/:id', function(req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//save the task 

router.post('/task', function(req, res, next) {
    var task = req.body;
    if (!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }

});

//Delete task
router.delete('/tasks/:id', function(req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//Update task 
router.put('/tasks/:id', function(req, res, next) {

    var task = req.body;
    var updtask = {};

    if (task.isDone) {
        updtask.isDone = task.isDone;
    }
    if (task.title) {
        updtask.title = task.title;
    }
    if (!updtask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updtask, {}, function(err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });

    }
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

module.exports = router;