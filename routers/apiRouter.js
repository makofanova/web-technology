const db = require("../database");
const md5 = require("md5");

const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 *
 */

router.get("/users", (req, res, next) => {
    const sql = "select * from user";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get("/user/:id", (req, res, next) => {
    const sql = "select * from user where id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

/**
 * @swagger
 * /api/user/:
 *  post:
 *      summary: Create new user
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to create
 *          schema:
 *              type: object
 *              required:
 *                - username
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                  email:
 *                      type: string
 *                      required: true
 *                  password:
 *                      type: string
 *                      required: true
 *      responses:
 *          200:
 *              description: User created
 *          400:
 *              description: Error
 */
router.post("/user/", (req, res, next) => {
    const errors = [];
    if (!req.body.password) {
        errors.push("No password specified");
    }
    if (!req.body.email) {
        errors.push("No email specified");
    }
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    };
    const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    const params = [data.name, data.email, data.password];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})

/**
 * @swagger
 * /api/user/{id}:
 *  patch:
 *      summary: Update user by id
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: body
 *          name: user
 *          schema:
 *              type: object
 *              required:
 *                - username
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                  email:
 *                      type: string
 *                      required: true
 *                  password:
 *                      type: string
 *                      required: true
 *      responses:
 *          200:
 *              description: User updated
 *          400:
 *              description: Error
 */
router.patch("/user/:id", (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password ? md5(req.body.password) : undefined
    };
    db.run(
        `UPDATE user
         set name     = coalesce(?, name),
             email    = COALESCE(?, email),
             password = coalesce(?, password)
         WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        (err, result) => {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
        });
})

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Deleting user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message": "deleted", rows: this.changes})
        });
})

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: Get all models
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *          description: Error
 *
 */
router.get("/models", (req, res, next) => {
    const sql = "select * from models";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

/**
 * @swagger
 * /api/model/{id}:
 *   get:
 *     summary: Get model by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.get("/model/:id", (req, res, next) => {
    const sql = "select * from models where id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

/**
 * @swagger
 * /api/model/:
 *  post:
 *      summary: Create new model
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The model to create
 *          schema:
 *              type: object
 *              required:
 *                - username
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                  score:
 *                      type: string
 *                      required: true
 *      responses:
 *          200:
 *              description: User created
 *          400:
 *              description: Error
 */
router.post("/model/", (req, res, next) => {
    const errors = [];
    if (errors.length) {
        res.status(400).json({"error": errors.join(",")});
        return;
    }
    const data = {
        name: req.body.name,
        score: req.body.score,
    };
    const sql = 'INSERT INTO models (name, score) VALUES (?,?)';
    const params = [data.name, data.score];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})

/**
 * @swagger
 * /api/model/{id}:
 *  patch:
 *      summary: Update model by id
 *      consumes:
 *          - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *        - in: body
 *          name: model
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                  score:
 *                      type: string
 *                      required: true
 *      responses:
 *          200:
 *              description: model updated
 *          400:
 *              description: Error
 */
router.patch("/model/:id", (req, res, next) => {
    const data = {
        name: req.body.name,
        score: req.body.score,
    };
    db.run(
        `UPDATE models
         set name     = ?,
             score    = ?
         WHERE id = ?`,
        [data.name, data.score, req.params.id],
        (err, result) => {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
        });
})

/**
 * @swagger
 * /api/model/{id}:
 *   delete:
 *     summary: Deleting model by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the model to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/model/:id", (req, res, next) => {
    db.run(
        'DELETE FROM models WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message": "deleted", rows: this.changes})
        });
})


module.exports = router;