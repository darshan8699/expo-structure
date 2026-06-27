# React Hook Form

React Hook Form is a lightweight form validation library that leverages **uncontrolled inputs** via React refs. It avoids re-rendering the entire screen on every keystroke, which can cause typing lag on low-end mobile devices.

---

## Dependencies

```bash
# Form Management
npm install react-hook-form

# Schema Validation (Optional)
npm install yup @hookform/resolvers
```

---

## Configuration & Integration with Yup
To parse Yup validation schemas inside React Hook Form, configure the `yupResolver` wrapper.

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email required'),
});

const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
});
```

---

## Implementation Steps
1. **Initialize useForm**: Configure fields, default values, and bind the resolver.
2. **Register Inputs**: Wrap text fields inside the `<Controller>` component to bridge native input references.
3. **Handle Submit**: Wrap execution methods inside `handleSubmit(onSubmit)`.

---

## Uncontrolled Refs Performance Model

```mermaid
graph TD
    User[User types character 'A'] -->|Direct Native Update| Ref[Native Text Input ref updates]
    Ref -->|Validates locally| Controller[Controller ref checks value]
    Note over Controller: Parent form container does not re-render.<br/>Only the active text field updates.
```
