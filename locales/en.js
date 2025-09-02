export default {
  name: 'Hello',
  nav: {
    homepage: 'Homepage',
    models: 'Models',
    docs: 'Docs',
    pricing: 'Pricing'
  },
  pay: {
    ready: {
      title: 'Entering Stripe Payment',
      autoRedirect: 'Will auto redirect in {s}s',
      goNow: 'Go to Stripe now',
      cancel: 'Cancel',
      back: 'Back'
    },
    checkout: {
      title: 'Stripe Checkout',
      back: 'Back',
      errors: {
        restoreFailed: 'Unable to restore payment, please retry',
        createFailed: 'Failed to create payment session, please login and retry'
      }
    },
    result: {
      title: 'Payment Result',
      success: 'Payment successful! Credits will arrive shortly.',
      canceled: 'You canceled the payment.',
      failed: 'Payment failed, please try again later.',
      loading: 'Checking payment status...',
      toPricing: 'Back to Plans',
      toProfile: 'View Account'
    }
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
    llmAgents: {
      regexAssistant: {
        name: 'Regex Assistant',
        description: 'Generate a usable regex from your requirement and examples'
      }
    },
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
    oneTime: 'one-time',
    buy: 'Buy',
    subscribe: 'Subscribe',
    portal: 'Portal',
    free: 'Free',
    bundles: {
      title: 'Message Packs',
      generic: '{credits} messages · one-time purchase, no expiry',
      pack4500: {
        title: '4,500 messages',
        feature: 'One-time purchase, no expiry'
      },
      pack9000: {
        title: '9,000 messages',
        feature: 'One-time purchase, no expiry'
      },
      pack47000: {
        title: '47,000 messages',
        feature: 'One-time purchase, no expiry'
      },
      pack100000: {
        title: '100,000 messages',
        feature: 'One-time purchase, no expiry'
      }
    },
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
  ,
  pages: {
    regexAssistant: {
      title: 'Regex Assistant',
      fields: {
        requirement: 'Requirement Summary',
        exampleString: 'Example String',
        outputFormat: 'Expected Output Format'
      },
      placeholders: {
        requirement: 'e.g., Extract email address',
        exampleString: 'e.g., Please contact me: test(at)example.com',
        outputFormat: 'e.g., The email address itself'
      },
      actions: {
        submit: 'Submit',
        submitting: 'Generating...',
        reset: 'Reset'
      },
      result: {
        title: 'Generated Regular Expression',
        copy: 'Copy'
      },
      messages: {
        fillAllFields: 'Please fill in all fields',
        generateFailed: 'Failed to generate. Ensure you are logged in and have enough credits.'
      }
    }
  }
}