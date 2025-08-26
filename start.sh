#!/bin/bash

# AI Tools Home 启动脚本

echo "🚀 Starting AI Tools Home..."

# 进入项目目录
cd /root/projects/ai-tools-home

# 检查是否已经在运行
if pm2 list | grep -q "ai-tools-home"; then
    echo "♻️  Service already running, restarting..."
    pm2 restart ai-tools-home
else
    echo "🎯 Starting new service..."
    # 设置环境变量让服务绑定到所有网络接口
    HOST=0.0.0.0 PORT=3000 pm2 start .output/server/index.mjs --name "ai-tools-home"
fi

# 显示状态
pm2 status ai-tools-home

echo "✅ AI Tools Home started successfully!"
echo "📍 Access at: http://localhost:3000"

# 显示日志
pm2 logs ai-tools-home --lines 20