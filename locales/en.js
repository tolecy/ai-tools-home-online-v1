export default {
  name: 'Hello',
  nav: {
    homepage: 'Homepage',
    models: 'Models',
    docs: 'Docs',
    pricing: 'Pricing'
  },
  language: {
    switch: 'Switch Language',
    current: 'Current Language'
  },
  home: {
    title: 'AI Toolbox',
    subtitle: 'Explore diverse AI tools and unleash unlimited creativity',
    getStarted: 'Get Started'
  },
  models: {
    title: 'AI Models',
    llm: {
      title: 'Large Language Models',
      gpt4: {
        name: 'GPT-4',
        description: "OpenAI's most advanced language model, capable of understanding and generating human-like text."
      },
      claude: {
        name: 'Claude 3.5-Sonnet',
        description: "Anthropic's powerful language model optimized for helpful and honest AI interactions."
      },
      gemini: {
        name: 'Gemini Flash',
        description: "Google's Gemini 1.5 Pro, a powerful multilingual model for diverse language tasks."
      },
      llama: {
        name: 'LLama 3.1',
        description: "Meta AI's LLama 3.1, a powerful multilingual model for diverse language tasks."
      }
    },
    categories: {
      'llm-agents': 'LLM Agents',
      'vision-models': 'Vision Models',
      'speech-models': 'Speech Models'
    },
    comingSoon: {
      title: 'Coming Soon',
      description: 'Stay tuned for exciting new models in this category!'
    },
    actions: {
      more: 'More',
      less: 'Less'
    }
  },
  docs: {
    title: 'Documentation',
    apiSection: {
      title: 'Model API Endpoints',
      description: 'You can call our models using the following API endpoint:',
      requestParams: 'Request Parameters',
      paramName: 'Parameter',
      paramType: 'Type',
      paramDesc: 'Description',
      modelIdDesc: 'The ID of the model to use',
      inputDesc: 'Input data',
      parametersDesc: 'Optional model parameters'
    },
    examplesSection: {
      title: 'Usage Examples',
      basicExample: {
        title: 'Basic API Call',
        comment: 'Using fetch API',
        sampleText: '"Hello, please introduce your service."'
      },
      batchExample: {
        title: 'Batch Processing Example',
        comment: 'Process multiple inputs in batch',
        question1: '"First question"',
        question2: '"Second question"',
        question3: '"Third question"'
      }
    },
    enterpriseSection: {
      title: 'Enterprise Solutions',
      privateDeployment: {
        title: 'Private Deployment',
        description: 'We offer complete model private deployment solutions that can deploy models on your infrastructure according to your business needs, ensuring data security and privacy.'
      },
      inferenceAcceleration: {
        title: 'Inference Acceleration',
        description: 'Provide professional inference performance acceleration services for specified models, optimize inference speed, reduce resource consumption, and enhance user experience.'
      },
      lowCostFinetuning: {
        title: 'Low-Cost Model Fine-tuning',
        description: 'Provide cost-effective model fine-tuning solutions to help you adapt general models to specific domains or tasks at a lower cost.'
      },
      contactInfo: 'For details, please send an email to'
    }
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: 2024-05-01',
    companyInfo: 'This Privacy Policy describes how EMOTIVERSE TECHNOLOGY LTD ("We", "Us", or "Our") collects, uses, and discloses information about you when you access or use our Services.',
    // 可以按需添加更多翻译项
  },
  termsOfService: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: 2025-04-06'
  },
  pricing: {
    title: 'Get unlimited access.',
    subtitle: 'Discover the ideal plan, beginning at under $2 per week.',
    payYearly: 'Pay Yearly',
    payMonthly: 'Pay Monthly',
    savePercent: 'Save 20% - 30%',
    perMonth: '/per month',
    subscribe: 'Subscribe',
    portal: 'Portal',
    free: 'Free',
    plans: {
      free: {
        title: 'Free',
        features: {
          0: '1000 messages/month'
        }
      },
      standard: {
        title: 'Standard',
        features: {
          0: '5000 messages/month',
          1: 'Limited Memory',
          2: 'Dedicated chat capacity with basic priority'
        }
      },
      premium: {
        title: 'Premium',
        features: {
          0: '6000 messages/month',
          1: 'Good Memory',
          2: 'Dedicated chat capacity with basic priority'
        }
      },
      deluxe: {
        title: 'Deluxe',
        features: {
          0: 'Unlimited messages/month',
          1: 'Maximum Memory',
          2: 'Dedicated chat capacity with basic priority',
          3: 'Adjust memory size',
          4: 'Adjust all message lengths',
          5: 'Enhance Immersion Mode'
        }
      }
    }
  }
}