import { registerRootComponent } from "expo";
import Home from "./Home";
import { NativeBaseProvider } from "native-base";


export default function App () { 
  return ( 
   <NativeBaseProvider>
     <Home/>
   </NativeBaseProvider>
  )
}

registerRootComponent(App)