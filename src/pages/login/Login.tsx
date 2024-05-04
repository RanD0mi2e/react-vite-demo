import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    function toRegister() {
        navigate('/register');
    }

    return (
        <>
            <div>login</div>
            <button onClick={toRegister}>跳转到注册页</button>
        </>
    )
}

export default Login