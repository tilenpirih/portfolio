<script setup lang="ts">
const fullName = ref('')
const email = ref('')
const message = ref('')
const valid = ref(false)
const form = ref<HTMLFormElement | null>(null)

const sending = ref(false)
const sended = ref(false)
const sendSuccessfully = ref(false)
const failMessage = ref('')

async function sendEmail() {
  if (!form.value || !valid.value)
    return
  sending.value = true

  await $fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify({
      fullName: fullName.value,
      email: email.value,
      message: message.value,
    }),
  }).then(() => {
    if (!form.value)
      return
    form.value.reset()
    valid.value = false
    sendSuccessfully.value = true
  }).catch(error => {
    if (error.status === 429) {
      failMessage.value = 'Too many requests. You can only send one email per hour.'
    }
    else {
      failMessage.value = 'Failed to send email'
    }
  }).finally(() => {
    sended.value = true
    sending.value = false
  })
}
</script>

<template>
  <v-container class="py-12">
    <animate-in as="h2" preset="fade-down" class="text-h3 text-primary text-center pb-4">
      Contact
    </animate-in>
    <animate-in preset="fade-down" class="text-center mb-5">
      Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
    </animate-in>
    <div class="flex justify-center">
      <v-form ref="form" v-model="valid" style="max-width: 600px; width: 600px;">
        <v-row>
          <animate-in preset="fade-right" as-child>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="fullName"
                label="Your name"
                :disabled="sended && sendSuccessfully"
                :rules="[v => !!v || 'Name is required']"
              />
            </v-col>
          </animate-in>
          <animate-in preset="fade-left" as-child>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                label="Your email"
                :disabled="sended && sendSuccessfully"
                :rules="[v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
              />
            </v-col>
          </animate-in>
          <animate-in preset="fade-up" as-child>
            <v-col cols="12" class="pt-0">
              <v-textarea
                v-model="message"
                label="Message"
                :disabled="sended && sendSuccessfully"
                :rules="[v => !!v || 'Message is required']"
              />
            </v-col>
          </animate-in>
          <v-col cols="12" class="flex justify-end pt-0">
            <v-card v-if="sended && sendSuccessfully" class="w-full mr-6 justify-center items-center bg-success text-on-success hidden sm:flex px-2 text-center">
              Message sent successfully!
            </v-card>
            <v-card v-if="sended && !sendSuccessfully" class="w-full mr-6 justify-center items-center bg-error-container hidden sm:flex px-2 text-center text-on-error-container">
              {{ failMessage }}
            </v-card>
            <v-btn
              color="primary"
              variant="outlined"
              :disabled="!valid"
              :loading="sending"
              @click="sendEmail()"
            >
              Send message
            </v-btn>
          </v-col>
          <v-col cols="12" class="block sm:hidden">
            <v-card v-if="sended && sendSuccessfully" min-height="36" class="flex w-full mr-6 justify-center items-center bg-success text-on-success px-2 text-center">
              Message sent successfully!
            </v-card>
            <v-card v-if="sended && !sendSuccessfully" min-height="36" class="flex w-full mr-6 justify-center items-center bg-background px-2 text-center text-on-error">
              {{ failMessage }}
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>
