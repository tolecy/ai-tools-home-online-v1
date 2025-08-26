export default {
  name: '你好',
  nav: {
    homepage: '首页',
    models: '模型',
    docs: '文档',
    pricing: '价格'
  },
  language: {
    switch: '切换语言',
    current: '当前语言'
  },
  home: {
    title: 'AI 工具箱',
    subtitle: '探索丰富多样的 AI 工具，释放无限创造力',
    getStarted: '立即开始'
  },
  models: {
    title: 'AI 模型',
    llm: {
      title: '大语言模型',
      gpt4: {
        name: 'GPT-4',
        description: 'OpenAI 最先进的语言模型，能够理解和生成类人文本。'
      },
      claude: {
        name: 'Claude 3.5-Sonnet',
        description: 'Anthropic 开发的强大语言模型，专注于提供有帮助且诚实的 AI 交互。'
      },
      gemini: {
        name: 'Gemini Flash',
        description: 'Google 的 Gemini 1.5 Pro，一个强大的多语言模型，适用于各种语言任务。'
      },
      llama: {
        name: 'LLama 3.1',
        description: 'Meta AI 的 LLama 3.1，一个强大的多语言模型，适用于各种语言任务。'
      }
    },
    categories: {
      'llm-agents': 'LLM 智能代理',
      'vision-models': '视觉模型',
      'speech-models': '语音模型'
    },
    comingSoon: {
      title: '即将推出',
      description: '敬请期待此类别中令人兴奋的新模型！'
    },
    actions: {
      more: '更多',
      less: '收起'
    }
  },
  docs: {
    title: '文档',
    apiSection: {
      title: '模型调用的API',
      description: '您可以通过以下API端点调用我们的模型：',
      requestParams: '请求参数',
      paramName: '参数名',
      paramType: '类型',
      paramDesc: '描述',
      modelIdDesc: '要使用的模型ID',
      inputDesc: '输入数据',
      parametersDesc: '可选的模型参数'
    },
    examplesSection: {
      title: '使用例子',
      basicExample: {
        title: '基本调用示例',
        comment: '使用fetch API',
        sampleText: '"您好，请介绍一下您的服务。"'
      },
      batchExample: {
        title: '批量处理示例',
        comment: '批量处理多个输入',
        question1: '"第一个问题"',
        question2: '"第二个问题"',
        question3: '"第三个问题"'
      }
    },
    enterpriseSection: {
      title: '企业解决方案',
      privateDeployment: {
        title: '私有化部署方案',
        description: '我们提供完整的模型私有化部署解决方案，可根据您的业务需求在您的基础设施上部署模型，确保数据安全与隐私。'
      },
      inferenceAcceleration: {
        title: '推理性能加速',
        description: '为指定模型提供专业的推理性能加速服务，优化推理速度，降低资源消耗，提升用户体验。'
      },
      lowCostFinetuning: {
        title: '低成本模型微调',
        description: '提供经济高效的模型微调方案，帮助您以较低成本将通用模型适配到特定领域或任务。'
      },
      contactInfo: '详情请发送邮件至'
    }
  },
  privacyPolicy: {
    title: '隐私政策',
    lastUpdated: '最后更新：2024-05-01',
    companyInfo: '本隐私政策描述了EMOTIVERSE TECHNOLOGY LTD（"我们"）如何收集、使用和披露您在访问或使用我们的服务时的信息。',
    // 可以按需添加更多翻译项
  },
  termsOfService: {
    title: '服务条款',
    lastUpdated: '最后更新：2025-04-06'
  },
  pricing: {
    title: '获取无限制访问',
    subtitle: '探索理想计划，每周仅需不到2美元',
    payYearly: '按年付费',
    payMonthly: '按月付费',
    savePercent: '节省 20% - 30%',
    perMonth: '/月',
    subscribe: '订阅',
    portal: '入口',
    free: '免费',
    plans: {
      free: {
        title: '免费版',
        features: {
          0: '每月1000条消息'
        }
      },
      standard: {
        title: '标准版',
        features: {
          0: '每月5000条消息',
          1: '有限内存',
          2: '专用聊天容量，基础优先级'
        }
      },
      premium: {
        title: '高级版',
        features: {
          0: '每月6000条消息',
          1: '良好内存',
          2: '专用聊天容量，基础优先级'
        }
      },
      deluxe: {
        title: '豪华版',
        features: {
          0: '每月无限消息',
          1: '最大内存',
          2: '专用聊天容量，基础优先级',
          3: '调整内存大小',
          4: '调整所有消息长度',
          5: '增强沉浸模式'
        }
      }
    }
  }
}