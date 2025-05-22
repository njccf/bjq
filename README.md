# 微信风格富文本编辑器

这是一个模仿微信公众号的富文本编辑器，支持SVG代码导入，并可以生成分享链接供用户在微信端查看。

## 功能特点

- 富文本编辑功能，支持文本格式化、图片插入等
- 支持导入SVG代码
- 文章保存与管理
- 文章预览与分享
- 响应式设计，适配移动端

## 技术栈

- React
- React Router
- React Quill (富文本编辑器)
- LocalStorage (本地存储)

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

## 部署到Netlify

1. 在GitHub上创建一个新的仓库
2. 将本项目代码推送到该仓库
3. 在Netlify上注册账号并登录
4. 点击"New site from Git"
5. 选择GitHub作为Git提供商
6. 授权Netlify访问您的GitHub账户
7. 选择包含本项目的仓库
8. 在构建设置中：
   - 构建命令：`npm run build`
   - 发布目录：`build`
9. 点击"Deploy site"

部署完成后，Netlify会提供一个URL，您可以通过该URL访问您的应用。

## 使用说明

1. 首页是编辑器界面，可以编写文章内容
2. 点击工具栏中的SVG按钮可以插入SVG代码
3. 点击"保存草稿"或"发布"按钮保存文章
4. 在预览页面可以查看文章效果，并获取分享链接
5. 在文章列表页面可以管理所有文章

## 注意事项

- 本应用使用LocalStorage存储数据，清除浏览器缓存会导致数据丢失
- 为了更好的体验，建议在Chrome或Firefox浏览器中使用 