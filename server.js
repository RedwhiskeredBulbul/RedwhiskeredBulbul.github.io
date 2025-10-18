const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 允许前端访问 public 文件夹
app.use(express.static('public'));
// 解析 JSON 请求体
app.use(express.json());

// 读取记录
app.get('/api/records', (req, res) => {
  const data = fs.readFileSync('./data/records.json');
  const records = JSON.parse(data);
  res.json(records);
});

// 添加记录
app.post('/api/records', (req, res) => {
  const data = fs.readFileSync('./data/records.json');
  const records = JSON.parse(data);
  records.push(req.body);
  fs.writeFileSync('./data/records.json', JSON.stringify(records, null, 2));
  res.status(201).json({ message: 'Record added' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`✅ 服务器运行在 http://localhost:${PORT}`);
});