const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        login: './login.html',
        signup: './signup.html',
        chatbot: './chatbot.html',
        updatePassword: './updatePassword.html',
      }
    }
  }
})
