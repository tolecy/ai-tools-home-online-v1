# 使用Node.js官方镜像作为基础镜像
FROM node:22-alpine

# 安装pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装项目依赖
RUN pnpm install --frozen-lockfile

# 复制项目文件到工作目录
COPY . .

# 构建Nuxt项目
RUN pnpm run build

# 暴露Nuxt服务的端口，默认是3000
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 启动Nuxt服务（生产模式）
CMD ["pnpm", "run", "preview"]