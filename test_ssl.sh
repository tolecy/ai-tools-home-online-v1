#!/bin/bash

echo "=== SSL 证书测试 ==="
echo "域名: fastaitool.xyz"
echo ""

echo "1. 测试 HTTPS 连接:"
curl -I https://fastaitool.xyz 2>/dev/null | head -5
echo ""

echo "2. 测试 HTTP 到 HTTPS 重定向:"
curl -I http://fastaitool.xyz 2>/dev/null | head -5
echo ""

echo "3. 证书信息:"
echo "颁发者: $(openssl s_client -connect fastaitool.xyz:443 -servername fastaitool.xyz < /dev/null 2>/dev/null | openssl x509 -noout -issuer | cut -d'=' -f2-)"
echo "有效期: $(openssl s_client -connect fastaitool.xyz:443 -servername fastaitool.xyz < /dev/null 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d'=' -f2-)"
echo ""

echo "4. 证书链验证:"
openssl s_client -connect fastaitool.xyz:443 -servername fastaitool.xyz < /dev/null 2>/dev/null | grep -E "(Verify return code|subject=|issuer=)" | tail -3
echo ""

echo "5. 自动续期状态:"
systemctl is-active certbot.timer
echo ""

echo "=== 测试完成 ===" 