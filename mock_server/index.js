const express = require("express");
const app = express();
const port = 8000;

// Данные сущностей
const users = [
  { id: 1, name: "Иван", age: 25, email: "ivan@example.com" },
  { id: 2, name: "Мария", age: 30, email: "maria@example.com" },
  { id: 3, name: "Алексей", age: 22, email: "alexey@example.com" },
  { id: 4, name: "Ольга", age: 28, email: "olga@example.com" },
  { id: 5, name: "Дмитрий", age: 35, email: "dmitriy@example.com" },
];

const products = [
  { id: 1, title: "Ноутбук", price: 1500, category: "Электроника" },
  { id: 2, title: "Смартфон", price: 800, category: "Электроника" },
  { id: 3, title: "Книга", price: 20, category: "Книги" },
  { id: 4, title: "Стол", price: 100, category: "Мебель" },
  { id: 5, title: "Кофеварка", price: 50, category: "Техника для кухни" },
];

// Эндпоинт healthcheck
app.get("/api/healthcheck", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.get("/api/entities", (req, res) => {
  res.json(["user", "product"]);
});

// Эндпоинт, возвращающий описание полей сущностей
app.get("/api/entities/:entityName/schema", (req, res) => {
  const { entityName } = req.params;

  const schemas = {
    user: [
      { fieldName: "id", fieldType: "number" },
      { fieldName: "name", fieldType: "string" },
      { fieldName: "age", fieldType: "number" },
      { fieldName: "email", fieldType: "string" },
    ],
    product: [
      { fieldName: "id", fieldType: "number" },
      { fieldName: "title", fieldType: "string" },
      { fieldName: "price", fieldType: "number" },
      { fieldName: "category", fieldType: "string" },
    ],
  };

  const schema = schemas[entityName.toLowerCase()];

  if (schema) {
    res.json(schema);
  } else {
    res.status(404).json({ error: "Entity not found" });
  }
});

// Эндпоинты для получения данных сущностей
app.get("/api/entities/user", (req, res) => {
  res.json(users);
});

app.get("/api/entities/product", (req, res) => {
  res.json(products);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Напиши простое приложение на express js
// пусть там будет эндпоинт healthcheck

// основной функционал:
// эндпоинт который возвращает какие поля для таблицы хранит сущность (придумай пару сущностей на любую тему), например: {fieldName: "name", filedType: 'custom', ...rest}

// эндпоинты для самих сущностей - возвращает массив объектов этой сущности
