<template>
  <div class="terms-container max-w-4xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold mb-6">{{ $t('termsOfService.title') }}</h1>
    <p class="text-sm text-gray-600 mb-8">{{ $t('termsOfService.lastUpdated') }}</p>
    
    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
      <p>
        By accessing and using our Service, you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">2. Description of Service</h2>
      <p>
        We provide a tool to choose a large language model (LLM) for requests and route the request to this model ("Service"). Users are responsible for providing all equipment necessary to access the Service.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">3. User Registration</h2>
      <p>
        To use certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">4. User Conduct</h2>
      <p>
        Users agree not to misuse the Service. This includes, but is not limited to, accessing or using the Service for any purpose other than that for which we make it available, or using the Service in a manner inconsistent with any applicable laws or regulations.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">5. Intellectual Property</h2>
      <p>
        All content, trademarks, services marks, trade names, logos, and icons are proprietary to us or our licensors or licensees. Nothing contained on the Service should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any trademark displayed on the Service without our written permission or that of third-party owners of such trademarks. Your use of the trademarks displayed on the Service, or any other content on the Service, except as provided herein, is strictly prohibited.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">6. Termination</h2>
      <p>
        We reserve the right, in our sole discretion, to terminate or suspend your access to the Service, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties, or for any other reason.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">7. Limitation of Liability</h2>
      <p>
        Under no circumstances, including, but not limited to, negligence, shall we be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the Service, even if we have been advised of the possibility of such damages.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">8. Changes to Terms</h2>
      <p>
        We reserve the right to change, modify, add, or remove portions of these Terms at any time. Please check these Terms periodically for changes. Your continued use of the Service following the posting of changes to these Terms will mean you accept those changes.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">9. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of Germany, without giving effect to any principles of conflicts of law.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-bold mb-4">10. Contact Information</h2>
      <p>
        If you have any questions about these Terms, please contact us at <a href="mailto:emotiversetech@gmail.com" class="text-primary hover:underline">emotiversetech@gmail.com</a>.
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
.terms-container {
  font-size: 16px;
  line-height: 1.6;
  margin-top: 40px;
}
</style>