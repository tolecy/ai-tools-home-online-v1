export default {
  name: '你好',
  nav: {
    homepage: '首页',
    models: '模型',
    docs: '文档',
    pricing: '价格'
  },
  pay: {
    ready: {
      title: '即将进入 Stripe 支付',
      autoRedirect: '{s}s 后将自动跳转',
      goNow: '立即前往 Stripe 支付',
      cancel: '取消',
      back: '返回'
    },
    checkout: {
      title: '安全支付',
      back: '返回',
      errors: {
        restoreFailed: '无法恢复支付，请重试',
        createFailed: '创建支付会话失败，请登录后重试'
      }
    },
    result: {
      title: '支付结果',
      success: '支付成功！积分将很快到账。',
      canceled: '您已取消支付。',
      failed: '支付失败，请稍后重试。',
      loading: '正在查询支付状态...',
      toPricing: '返回套餐',
      toProfile: '查看账户'
    }
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
    llmAgents: {
      regexAssistant: {
        name: '正则表达式助手',
        description: '根据需求与示例生成可用的正则表达式'
      }
    },
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
    oneTime: '一次性',
    buy: '购买',
    subscribe: '订阅',
    portal: '入口',
    free: '免费',
    bundles: {
      title: '消息包',
      generic: '{credits} 条消息 · 一次性购买，永久有效',
      pack4500: {
        title: '4,500 条消息',
        feature: '一次性购买，永久有效'
      },
      pack9000: {
        title: '9,000 条消息',
        feature: '一次性购买，永久有效'
      },
      pack47000: {
        title: '47,000 条消息',
        feature: '一次性购买，永久有效'
      },
      pack100000: {
        title: '100,000 条消息',
        feature: '一次性购买，永久有效'
      }
    },
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
  ,
  pages: {
    regexAssistant: {
      title: '正则表达式助手',
      fields: {
        requirement: '需求简述',
        exampleString: '示例字符串',
        outputFormat: '期望结果格式'
      },
      placeholders: {
        requirement: '例如：提取邮箱地址',
        exampleString: '例如：请联系我：test(at)example.com',
        outputFormat: '例如：邮箱地址本身'
      },
      actions: {
        submit: '提交',
        submitting: '生成中...',
        reset: '重置'
      },
      result: {
        title: '生成的正则表达式',
        copy: '复制'
      },
      messages: {
        fillAllFields: '请完整填写表单',
        generateFailed: '生成失败，请确认已登录且有足够额度'
      }
    }
  }
}