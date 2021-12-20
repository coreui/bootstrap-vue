### CAlert

```jsx
import { CAlert } from '@coreui/bootstrap-vue'
// or
import CAlert from '@coreui/bootstrap-vue/src/components/alert/CAlert'
```

#### Props

| Prop name       | Description                                                                         | Type    | Values                                                                                          | Default |
| --------------- | ----------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------- | ------- |
| **color**       | \* Sets the color context of the component to one of Bootstrap Vue’s themed colors. | string  | `'primary'`, `'secondary'`, `'success'`, `'danger'`, `'warning'`, `'info'`, `'dark'`, `'light'` |         |
| **dismissible** | Optionally add a close button to alert and allow it to self dismisss.               | boolean | -                                                                                               | false   |
| **visible**     | Toggle the visibility of alert component.                                           | boolean | -                                                                                               | true    |

#### Events

| Event name | Description                                              | Properties |
| ---------- | -------------------------------------------------------- | ---------- |
| **close**  | Callback fired when the component requests to be closed. |
