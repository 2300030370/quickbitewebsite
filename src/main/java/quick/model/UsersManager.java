package quick.model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quick.repository.UsersRepository;

@Service
public class UsersManager {
@Autowired
UsersRepository UR;
@Autowired
EmailManager EM;
@Autowired
JWTManager JWT;
public String addUser(Users U) {
	if(UR.validateEmail(U.getEmail())>0)
		return "401::Email already exist";
	UR.save(U);
	return "200::User Registered Successfully";
}
public String recoverPassword(String emailid) {
	 Users U = UR.findById(emailid).get();
	    String message = String.format("Dear %s, \n \n Your Password is : %s",U.getFullname(),U.getPassword());
	    return EM.sendEmail(U.getEmail(), "JobPortal : Password Recovery", message);	}

public String validateCredentials(String email, String password) {
	if(UR.validateCredentials(email, password)>0) {
		String token= JWT.generateToken(email);
		return "200::"+token;
	}
	return "401::Invalid Crendetial(Check Username and Password)";
}

}