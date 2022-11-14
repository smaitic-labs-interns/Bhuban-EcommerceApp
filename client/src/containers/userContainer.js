import { connect} from "react-redux";
import { add_user } from "../services/Actions/actions";
import User from "../components/Pages/Login/User";

const mapStateToProps = (state) => ({
    data:state
})

const mapDispatchToProps = (dispatch) => ({
    add_user_handler: (data) => dispatch(add_user(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(User) // components on seconde arg