# UI-кит для околомаркетинговых штук

## Компоненты

- base-button
- base-heading
- base-text
- base-link
- base-loader
- base-stack — комонент для раскладки элементов и настройки отступов между ними
- base-input
- base-textarea
- base-select
- form-divider
- form-label
- form-error
- form-footer
- form-row
- nps-rating

## Пример использования

```vue
<template>
<form>
  <form-field>
    <template #default="{ id }" label="Field 1">
      <base-input :id="id" />
    </template>
  </form-field>
  <form-field>
    <template #default="{ id }" label="Field 2">
      <base-textarea :id="id" />
    </template>
  </form-field>
  <form-footer>
    <base-button type="submit">Submit form</base-button>
  </form-footer>
</form>
</template>

<script>
import 'huntkit/hunt-kit.css';

import { BaseInput, BaseTextarea, BaseButton, FormField, FormFooter } from 'huntkit';

export default {
  components: {
    BaseInput,
    BaseTextarea,
    BaseButton,
    FormField,
    FormFooter
  }
}
</script>
```
