import './App.css'
import { RouterGuard } from "./router/RouterGuard";

const App = () => {

    return (
        <div className={'height_all'}>
            <RouterGuard />
        </div>
    )
};

export default App
