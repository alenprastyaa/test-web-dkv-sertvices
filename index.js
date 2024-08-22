const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());  // Enable CORS for all routes

const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12727181',
    password: 'j5sLfG1vpZ',
    database: 'sql12727181',
    port: 3306
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Get all products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a single product by ID
app.get('/products/:id', (req, res) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Add a new product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    const sql = 'INSERT INTO products SET ?';
    db.query(sql, newProduct, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newProduct });
    });
});

// Update a product by ID
app.put('/products/:id', (req, res) => {
    const updatedProduct = req.body;
    const sql = 'UPDATE products SET ? WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [updatedProduct, id], (err) => {
        if (err) throw err;
        res.json({ id, ...updatedProduct });
    });
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Product deleted' });
    });
});

// Get all blogs
app.get('/blogs', (req, res) => {
    const sql = 'SELECT * FROM blogs';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a single blog by ID
app.get('/blogs/:id', (req, res) => {
    const sql = 'SELECT * FROM blogs WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Add a new blog
app.post('/blogs', (req, res) => {
    const newBlog = req.body;
    const sql = 'INSERT INTO blogs SET ?';
    db.query(sql, newBlog, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newBlog });
    });
});

// Update a blog by ID
app.put('/blogs/:id', (req, res) => {
    const updatedBlog = req.body;
    const sql = 'UPDATE blogs SET ? WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [updatedBlog, id], (err) => {
        if (err) throw err;
        res.json({ id, ...updatedBlog });
    });
});

// Delete a blog by ID
app.delete('/blogs/:id', (req, res) => {
    const sql = 'DELETE FROM blogs WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Blog deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
