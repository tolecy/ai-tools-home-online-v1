<template>
  <div class="privacy-policy-container max-w-4xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-6">{{ $t('privacyPolicy.title') }}</h1>
    <p class="text-sm text-gray-600 mb-8">{{ $t('privacyPolicy.lastUpdated') }}</p>
    
    <p class="mb-6">
      {{ $t('privacyPolicy.companyInfo') }}
    </p>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">1. PERSONAL INFORMATION COLLECTION</h2>
      <p class="mb-4">
        We collect and store personal identification information you choose to share with us, such as your email address or wallet address. We also collect information related to your use of our Services, such as the web application URL associated with model requests.
      </p>
      <p>
        Users have the ability to opt out of logging prompts and completions, which are used to improve anonymous analytics features like classification. The Analytics section of the account page controls this preference. Users can also request the deletion of prompts and completions by contacting us using our <a href="mailto:emotiversetech@gmail.com" class="text-primary hover:underline">emotiversetech@gmail.com</a> email address.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">2. USE OF INFORMATION</h2>
      <p>We use the information we collect for various purposes, including:</p>
      <ul class="list-disc pl-8 my-4">
        <li>To set up and maintain your account</li>
        <li>To improve our services</li>
        <li>For billing purposes</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">3. INFORMATION SHARING AND DISCLOSURE</h2>
      <p class="mb-4">
        We do not share your personal information with third parties except for certain service providers, including analytics services (like Google Analytics) and third-party service providers (like Clerk). These third parties only have access to your information as necessary to perform their functions and are not permitted to use it for other purposes.
      </p>
      <p>
        AI model providers generally store prompt data transiently or not at all, but a few provide lower pricing if they can collect prompts anonymously. To see the data policy of a given model provider, please visit it on the models page.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">4. USER RIGHTS AND CHOICES</h2>
      <p>
        You can update your personal information that is modifiable via the user interface on our platform. If you wish to request deletion of your personal data, please contact us using our <a href="mailto:emotiversetech@gmail.com" class="text-primary hover:underline">emotiversetech@gmail.com</a> email address.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">5. COOKIES AND OTHER TRACKING TECHNOLOGIES</h2>
      <p>
        We use cookies to store session information about you to enhance your experience on our platform. By using our Services, you agree to our use of these methods.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">6. DATA TRANSFERS</h2>
      <p>
        We do not transfer your personal data internationally.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">7. POLICY TOWARDS CHILDREN</h2>
      <p>
        Our Services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information from our records.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">8. CHANGES TO THIS PRIVACY POLICY</h2>
      <p>
        We may modify this Privacy Policy at any time without notice. Your continued use of our Services following the posting of changes will mean that you accept and agree to the changes.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">9. CONTACT US</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or our practices, please contact us using our <a href="mailto:emotiversetech@gmail.com" class="text-primary hover:underline">emotiversetech@gmail.com</a> email address.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">10. TERMINATION</h2>
      <p class="mb-4">
        We may terminate your use of the Services at any time and for any reason, including for a violation of the Terms of Service, upon providing notice to you. You may terminate your use of the Services at any time by ceasing to use our Services.
      </p>
      <p>
        Upon termination, all rights and obligations will be extinguished other than such rights and obligations which by their nature should survive, including, without limitation, ownership provisions, warranty disclaimers, limitations of liability, and dispute resolution provisions.
      </p>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.privacy-policy-container {
  font-size: 16px;
  line-height: 1.6;
  margin-top: 40px;
}
</style>
