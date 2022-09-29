import { connect} from "react-redux";
import { user_register } from "../services/Actions/user";
import Register from "../components/Pages/User/Register";

const mapStateToProps = (state) => ({
    data:state
})

const mapDispatchToProps = (dispatch) => ({
    user_register_handler: (data) => dispatch(user_register(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register) // components on seconde arg