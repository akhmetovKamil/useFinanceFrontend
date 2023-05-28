import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {makeStore, wrapper} from "@/store/store";
import { Provider } from "react-redux";

const store = makeStore()
function App({ Component, pageProps }: AppProps) {

  return (
      <>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
  );
}
export default wrapper.withRedux(App);