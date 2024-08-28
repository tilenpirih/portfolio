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
    console.log(error)
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
  <v-container id="contact" class="py-8">
    <div data-aos="fade-down" class="text-h3 text-primary text-center mb-5">
      Contact
    </div>
    <div data-aos="fade-down" class="text-center mb-5">
      Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
    </div>
    <div class="d-flex justify-center">
      <v-form ref="form" v-model="valid" style="max-width: 600px; width: 600px;">
        <v-row>
          <v-col data-aos="fade-right" cols="12" md="6">
            <v-text-field
              v-model="fullName"
              label="Your name"
              :disabled="sended && sendSuccessfully"
              :rules="[v => !!v || 'Name is required']"
            />
          </v-col>
          <v-col data-aos="fade-left" cols="12" md="6">
            <v-text-field
              v-model="email"
              label="Your email"
              :disabled="sended && sendSuccessfully"
              :rules="[v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
            />
          </v-col>
          <v-col data-aos="fade-up" cols="12" class="pt-0">
            <v-textarea
              v-model="message"
              label="Message"
              :disabled="sended && sendSuccessfully"
              :rules="[v => !!v || 'Message is required']"
            />
          </v-col>
          <v-col cols="12" class="d-flex justify-end pt-0">
            <v-card v-if="sended && sendSuccessfully" class="w-100 mr-6 justify-center align-center bg-success d-none d-sm-flex px-2 text-center">
              Message sent successfully!
            </v-card>
            <v-card v-if="sended && !sendSuccessfully" class="w-100 mr-6 justify-center align-center bg-error d-none d-sm-flex px-2 text-center">
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
          <v-col cols="12" class="d-block d-sm-none">
            <v-card v-if="sended && sendSuccessfully" min-height="36" class="d-flex w-100 mr-6 justify-center align-center bg-success px-2 text-center">
              Message sent successfully!
            </v-card>
            <v-card v-if="sended && !sendSuccessfully" min-height="36" class="d-flex w-100 mr-6 justify-center align-center bg-error px-2 text-center">
              {{ failMessage }}
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>
