export const useTheme = () => {
  // 使用 useState 确保服务端渲染时的状态一致性
  const colorMode = useState<'light' | 'dark'>('color-mode', () => 'light')
  
  // 切换主题
  const toggleTheme = () => {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
    
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', colorMode.value)
    }
  }
  
  // 初始化主题
  const initTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light'
      colorMode.value = savedTheme as 'light' | 'dark'
      
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    }
  }
  
  return {
    colorMode,
    toggleTheme,
    initTheme,
  }
} 