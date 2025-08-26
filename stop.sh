#!/bin/bash

# AI Tools Home 停止脚本

echo "🛑 Stopping AI Tools Home..."

# 1. 停止 PM2 服务
echo "📌 Stopping PM2 service..."
pm2 stop ai-tools-home 2>/dev/null
pm2 delete ai-tools-home 2>/dev/null

# 2. 强制杀死相关进程
echo "🔨 Force killing related processes..."

# 查找并杀死所有相关进程
pkill -f "ai-tools-home" 2>/dev/null
pkill -f "/root/projects/ai-tools-home" 2>/dev/null
pkill -f "nuxt" 2>/dev/null

# 3. 查找并杀死占用3000端口的进程
echo "🚪 Killing processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null

# 4. 验证清理结果
echo "🔍 Checking remaining processes..."
REMAINING=$(ps aux | grep -E "(ai-tools-home|nuxt)" | grep -v grep | wc -l)

if [ $REMAINING -eq 0 ]; then
    echo "✅ All processes stopped successfully!"
else
    echo "⚠️  Still found $REMAINING related processes:"
    ps aux | grep -E "(ai-tools-home|nuxt)" | grep -v grep
    echo ""
    echo "🔧 Manual cleanup required. Run:"
    echo "   ps aux | grep ai-tools-home"
    echo "   kill -9 <PID>"
fi

echo "🏁 Stop script completed!"