<template>
  <div class="docs-container">
    <h1>{{ $t('docs.title') }}</h1>
    
    <section class="api-section">
      <h2>{{ $t('docs.apiSection.title') }}</h2>
      <div class="api-content">
        <p>{{ $t('docs.apiSection.description') }}</p>
        <pre><code>POST https://fastaitool.xyz/v1/models/{model_id}/predict</code></pre>
        
        <h3>{{ $t('docs.apiSection.requestParams') }}</h3>
        <table>
          <thead>
            <tr>
              <th>{{ $t('docs.apiSection.paramName') }}</th>
              <th>{{ $t('docs.apiSection.paramType') }}</th>
              <th>{{ $t('docs.apiSection.paramDesc') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>model_id</td>
              <td>string</td>
              <td>{{ $t('docs.apiSection.modelIdDesc') }}</td>
            </tr>
            <tr>
              <td>input</td>
              <td>object</td>
              <td>{{ $t('docs.apiSection.inputDesc') }}</td>
            </tr>
            <tr>
              <td>parameters</td>
              <td>object</td>
              <td>{{ $t('docs.apiSection.parametersDesc') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    
    <section class="examples-section">
      <h2>{{ $t('docs.examplesSection.title') }}</h2>
      
      <div class="example">
        <h3>{{ $t('docs.examplesSection.basicExample.title') }}</h3>
        <pre><code>
// {{ $t('docs.examplesSection.basicExample.comment') }}
fetch('https://fastaitool.xyz/v1/models/text-model/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    input: {
      text: {{ $t('docs.examplesSection.basicExample.sampleText') }}
    },
    parameters: {
      temperature: 0.7,
      max_tokens: 100
    }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
        </code></pre>
      </div>
      
      <div class="example">
        <h3>{{ $t('docs.examplesSection.batchExample.title') }}</h3>
        <pre><code>
// {{ $t('docs.examplesSection.batchExample.comment') }}
const inputs = [
  {{ $t('docs.examplesSection.batchExample.question1') }},
  {{ $t('docs.examplesSection.batchExample.question2') }},
  {{ $t('docs.examplesSection.batchExample.question3') }}
];

const requests = inputs.map(text => 
  fetch('https://fastaitool.xyz/v1/models/text-model/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      input: { text },
      parameters: {
        temperature: 0.5,
        max_tokens: 50
      }
    })
  }).then(res => res.json())
);

Promise.all(requests)
  .then(results => console.log(results))
  .catch(error => console.error('Error:', error));
        </code></pre>
      </div>
    </section>

    <section class="enterprise-solutions">
      <h2>{{ $t('docs.enterpriseSection.title') }}</h2>
      <div class="solution-card">
        <h3>{{ $t('docs.enterpriseSection.privateDeployment.title') }}</h3>
        <p>{{ $t('docs.enterpriseSection.privateDeployment.description') }}</p>
      </div>
      
      <div class="solution-card">
        <h3>{{ $t('docs.enterpriseSection.inferenceAcceleration.title') }}</h3>
        <p>{{ $t('docs.enterpriseSection.inferenceAcceleration.description') }}</p>
      </div>
      
      <div class="solution-card">
        <h3>{{ $t('docs.enterpriseSection.lowCostFinetuning.title') }}</h3>
        <p>{{ $t('docs.enterpriseSection.lowCostFinetuning.description') }}</p>
      </div>
      
      <div class="contact-info">
        <p>{{ $t('docs.enterpriseSection.contactInfo') }} <a href="mailto:emotiversetech@gmail.com">emotiversetech@gmail.com</a></p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.docs-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

section {
  margin-bottom: 40px;
}

h1 {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
}

.example {
  margin-bottom: 30px;
}

.enterprise-solutions {
  margin-top: 40px;
}

.solution-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.solution-card h3 {
  margin-top: 0;
  color: #333;
}

.contact-info {
  background-color: #eef7ff;
  border-left: 4px solid #2c8af8;
  padding: 15px;
  margin-top: 30px;
  border-radius: 0 4px 4px 0;
}

.contact-info a {
  color: #2c8af8;
  text-decoration: none;
  font-weight: bold;
}

.contact-info a:hover {
  text-decoration: underline;
}

</style>