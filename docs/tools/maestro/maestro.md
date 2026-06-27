Doc: https://docs.maestro.dev/

Maestro શું છે? (ગુજરાતીમાં)

Maestro એ Mobile અને Web Application માટેનું Open Source UI Automation Testing Framework છે. તે Android, iOS, React Native, Flutter અને Web Apps માટે End-to-End (E2E) Testing સરળ બનાવે છે.

Maestro કેમ ઉપયોગી છે?

React Native Developer તરીકે તમારા માટે Maestro ખૂબ ઉપયોગી છે કારણ કે:

✅ User જેમ App વાપરે છે તેમ Testing કરે છે.
✅ React Native, Flutter, Native Android/iOS બધામાં કામ કરે છે.
✅ YAML આધારિત સરળ Syntax.
✅ Manual sleep() અથવા wait logic ઓછું લખવું પડે.
✅ CI/CD (GitHub Actions, Jenkins વગેરે) સાથે Integration.
✅ Fast Test Execution અને Maintenance.
Maestro કેવી રીતે કામ કરે છે?

માનો કે તમારી App માં Login Screen છે.

login.yaml

## appId: com.myapp

- launchApp
- tapOn: "Email"
- inputText: "test@gmail.com"
- tapOn: "Password"
- inputText: "123456"
- tapOn: "Login"
- assertVisible: "Welcome"

આ Flow ચલાવતાં Maestro:

App Launch કરશે
Email દાખલ કરશે
Password દાખલ કરશે
Login Button પર Tap કરશે
"Welcome" Text દેખાય છે કે નહીં તે Verify કરશે
React Native માં Maestro ના ફાયદા
Feature Maestro
React Native Support ✅
Android ✅
iOS ✅
YAML Based ✅
Easy Setup ✅
CI/CD Support ✅
Open Source ✅

Installation

macOS:

curl -Ls "https://get.maestro.mobile.dev" | bash

ચેક કરવા:

maestro --version

પછી Emulator અથવા Real Device ચાલુ કરીને Test Run કરો.

---

## React Native માં Maestro Setup કરવાના પગલાં (Implementation Steps)

React Native કે Expo project માં Maestro E2E UI testing setup કરવા માટે નીચેના પગલાં અનુસરો:

### ૧. React Native App માં UI Elements ને Identify કરવા (Add testID)

Maestro સ્ક્રીન પરના components (બટન, ઇનપુટ બોક્સ વગેરે) ને ઓળખવા માટે `testID` પ્રોપર્ટીનો ઉપયોગ કરે છે. તમારા React Native components માં `testID` ઉમેરો:

```tsx
// LoginScreen.tsx માં ઉદાહરણ
import { TextInput, TouchableOpacity, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <TextInput testID="email_input" placeholder="Email દાખલ કરો" />
      <TextInput
        testID="password_input"
        placeholder="Password દાખલ કરો"
        secureTextEntry
      />
      <TouchableOpacity testID="login_button">
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### ૨. Project માં `.maestro/` Folder બનાવવું

તમારા project ના Root ડિરેક્ટરીમાં એક નવું ફોલ્ડર બનાવો અને ટેસ્ટ ફ્લો ફાઇલ બનાવો:

- ફોલ્ડરનું નામ: `.maestro`
- ફાઇલનું નામ: `login-flow.yaml`

### ૩. YAML Flow લખવો

`login-flow.yaml` માં નીચે મુજબનો YAML કોડ લખો:

```yaml
appId: com.yourcompany.myapp # અહીં તમારી App નું Bundle ID અથવા Package Name લખો
---
- launchApp
- tapOn: "email_input"
- inputText: "testuser@example.com"
- tapOn: "password_input"
- inputText: "SecurePassword123"
- hideKeyboard
- tapOn: "login_button"
- assertVisible: "Welcome, User" # Login થયા પછી દેખાતી Screen નો Text
```

> [!NOTE]  
> જો તમે **Expo** વાપરી રહ્યા છો, તો `appId` માં તમારા Expo Development Build નું bundle identifier (iOS) અથવા package name (Android) આપવું જરૂરી છે. તે `app.json` માંથી મળી રહેશે.

### ૪. Emulator / Simulator પર App Run કરવી

ટેસ્ટ રન કરતા પહેલા ખાતરી કરો કે તમારું Emulator (Android) અથવા Simulator (iOS) ચાલુ છે અને તેમાં App ચાલુ છે (અથવા build થયેલી છે).

- **React Native CLI માટે:**
  `npm run android` અથવા `npm run ios`
- **Expo Dev Client માટે:**
  `npx expo run:android` અથવા `npx expo run:ios`

### ૫. Maestro ટેસ્ટ રન કરવો

હવે terminal માં નીચેનો કમાન્ડ રન કરો:

```bash
maestro test .maestro/login-flow.yaml
```

Maestro આપોઆપ Simulator/Emulator સાથે કનેક્ટ થઈને તમારા લખેલા સ્ટેપ્સ એક પછી એક એક્ઝિક્યુટ કરશે.

### ૬. Maestro Studio (Debugging માટે)

જો તમારે UI Elements ના IDs ચેક કરવા હોય કે ટેસ્ટ ફ્લો વિઝ્યુઅલી બનાવવો હોય, તો નીચેનો કમાન્ડ રન કરો:

```bash
maestro studio
```

આ કમાન્ડથી તમારા બ્રાઉઝરમાં `http://localhost:5005` પર એક ઇન્ટરેક્ટિવ ઇન્ટરફેસ ઓપન થશે, જ્યાં તમે ડિવાઇસની સ્ક્રીન પર ક્લિક કરીને સીધા જ YAML કમાન્ડ્સ જનરેટ કરી શકશો.

---

React Native Developer માટે Recommendation

જો તમે:

React Native Apps બનાવો છો
Freelancing કરો છો
Production Apps maintain કરો છો

તો Unit Test + Integration Test સાથે Maestro E2E Testing શીખવું ખૂબ સારી skill છે. ઘણા teams હવે Detox/Appium કરતાં Maestro પસંદ કરે છે કારણ કે તેની YAML syntax અને setup સરળ છે. જોકે મોટા અને ખૂબ complex test suites માટે કેટલાક developers reliability અને performance વિશે mixed feedback પણ આપે છે.

સારાંશ:
Maestro = React Native, Android અને iOS Apps માટે સરળ, ઝડપી અને modern E2E Testing Framework.
