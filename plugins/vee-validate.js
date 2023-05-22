import Vue from 'vue'
// eslint-disable-next-line import/named
import { vForm, Field, ErrorMessage, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules'

extend('required', {
  ...rules.required,
  message: (_, values) => ['validation.required', values]
})

extend('email', {
  ...rules.email,
  message: (_, values) => ['validation.email', values]
})

Vue.component(vForm)
Vue.component(Field)
Vue.component(ErrorMessage)

// export default function ({ app }) {
//   // defineRule('required', required);
//   // defineRule('email', email);

//   configure({
//     // generateMessage: app.i18n.t,
//     validateOnInput: true,
//   });

//   // Vue 2
//   app.component(vForm);
//   app.component(Field);
//   app.component(ErrorMessage);

//   // // Vue 3
//   // app.use(Form);
//   // app.use(Field);
//   // app.use(ErrorMessage);
// }
